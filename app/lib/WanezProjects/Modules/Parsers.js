/**
 * Created by Ware on 05/10/2019.
 * Collection of parsers.
 *
 * @module _Modules/Parsers
 * 
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */


const { TMap, TDbrArray } = require(`../Classes`);

let ParsedData = {};
 
const EPathEnum = {
    Base: 0
    , CoreDBR: 1
    , ModDBR: 2
    , ModLua: 3
    , ModTags: 4
}
const GetPathGrimDawn = function(InPathEnum){
    let pathGrimDawn = `C:/Program Files (x86)/Steam/steamapps/common/Grim Dawn`
        , modName = `WanezUnchained`;

    switch (InPathEnum) {
        case EPathEnum.Base:
            return pathGrimDawn;
            break;
        case EPathEnum.CoreDBR:
            return `${pathGrimDawn}/database`;
            break;
        case EPathEnum.ModDBR:
            return `${pathGrimDawn}/mods/${modName}/database`;
            break;
        case EPathEnum.ModLua:
            return `${pathGrimDawn}/mods/${modName}/source/wanez/scripts`;
            break;
        case EPathEnum.ModTags:
            return `${pathGrimDawn}/mods/${modName}/source/Text_EN`;
            break;
    
        default:
            Log(`ERROR`);
            break;
    }
};



/**
 * Parse file contents to Object.
 * @param {string} InDbrFile *.dbr file path.
 * @param {Object} InOptions additional params.
 * @param {boolean} InOptions.bCheckModFirst if Path starts with / should Mod path be checked first for existing file or core path.
 * 
 * @returns parsed result.
 */
const DbrParse = function(InDbrFilePath, InOptions = {}){
    InOptions = Object.assign({
        bCheckModFirst: false
    }, InOptions);

    
    // ---
    let outData = {}
        , absoluteFilePath = InDbrFilePath
        , relativeFilePath = ``
        , dbrStr = false
        , dbrStrSplit
        , loopSplit;

    // fs.readFileSync(InDbrFilePath, 'utf-8')
    if(InDbrFilePath.startsWith(`/`)){
        absoluteFilePath = `${GetPathGrimDawn(EPathEnum.ModDBR)}${InDbrFilePath}`;
        relativeFilePath = InDbrFilePath;
        if(InOptions.bCheckModFirst){
            //absoluteFilePath = `${GetPathGrimDawn(EPathEnum.ModDBR)}${InDbrFilePath}`;
            try{
                dbrStr = fs.readFileSync(absoluteFilePath, 'utf-8');
            }catch(err){ /*console.error(err);*/ }
        }
        InDbrFilePath = `${GetPathGrimDawn(EPathEnum.CoreDBR)}${InDbrFilePath}`;
        
    }else{
        relativeFilePath = InDbrFilePath.replace(GetPathGrimDawn(EPathEnum.ModDBR), `/`);
        relativeFilePath = InDbrFilePath.replace(GetPathGrimDawn(EPathEnum.CoreDBR), `/`);
    }
    
    if(!dbrStr || typeof dbrStr === `undefined`){
        try{
            //Log(InDbrFilePath);
            dbrStr = fs.readFileSync(InDbrFilePath, 'utf-8');
        }catch(err){ 
            //console.error(err);
            // sets outData false, will return false and skip parsing. (#ToDo use template instead)
            outData = false;
        }
    }
    //Log(dbrStr);
    // --- AbsoluteFilePath: InFilePath, Data: outDataEntry
    if(outData){
        dbrStrSplit = dbrStr.split(`\n`);
        let dbrData = new TMap();
        for(let i = 0; i < dbrStrSplit.length; i++){
            // ---
            loopSplit = dbrStrSplit[i].split(`,`);
            if(typeof loopSplit[1] !== `undefined` && loopSplit[1] !== `` && loopSplit[1] !== `0.000000`){
                dbrData.push({
                    Key: loopSplit[0]
                    , Value: (loopSplit[1].includes(`;`)) ? loopSplit[1].split(`;`) : loopSplit[1]
                });
            }
        }
        outData = {
            AbsoluteFilePath: absoluteFilePath
            , RelativeFilePath: relativeFilePath
            , Data: dbrData
        };
    }
    
    
    return outData;
}

/**
 * Makes dbrDataArray into string that can be saved into a file.
 * @param {Array} InDbrData dbr as data array.
 */
const DbrStringify = function(InDbrData){
    let outStr = ``, loopValue;

    for(let i = 0; i < InDbrData.length; i++){
        
        loopValue = InDbrData[i].Value;
        if(loopValue !== ``){ // no reason to save an empty field
            if(Array.isArray(InDbrData[i].Value)){
                loopValue = ``;
                for(let j = 0; j < InDbrData[i].Value.length; j++){
                    // InDbrData[i].Value[j]
                    if(loopValue !== ``) loopValue += `;`;
                    loopValue += InDbrData[i].Value[j];
                }
            }
            outStr += `${InDbrData[i].Key},${loopValue},\n`;
        }
        
    }

    return outStr;
}

/**
 * #ToDo
 * @param {string} InRelativeFilePath rel path to .tpl (database/templates/*.tpl)
 */
const TplParse = function(InRelativeFilePath){
    InRelativeFilePath = InRelativeFilePath.replace(/\\/g, `/`).replace(`%TEMPLATE_DIR%`, ``).toLowerCase();

    let outData = []
        , absoluteFilePath = `${GetPathGrimDawn(EPathEnum.Base)}/${InRelativeFilePath}`
        , tplIndex = ParsedData[`TPL`].findIndex( x => x.Value === InRelativeFilePath);

    Log(tplIndex);
    if(tplIndex === -1){
        try{
            let tplStr = fs.readFileSync(absoluteFilePath, 'utf-8').replace(/ |\t|\r|"/g, ``)
                , tplSplits = tplStr.split(`\n`)
                , loopData
                , loopIndex
                , loopKey
                , loopValue;

            for(let i = 0; i < tplSplits.length; i++){
                // tplSplits[i]
                if(tplSplits[i] === `Variable` && tplSplits[i + 2] === `name=IncludeFile`){
                    //Log(`${tplSplits[i + 7].split(`=`)[1]}`);
                    
                    loopData = TplParse(tplSplits[i + 7].split(`=`)[1]);
                    for(let j = 0; j < loopData.length; j++){
                        // loopData[j]
                        
                        loopIndex = outData.findIndex( y => y.Key === loopData[j].Key);
                        if(loopIndex === -1){
                            outData.push({
                                Key: loopData[j].Key
                                , Value: loopData[j].Value
                            });
                        }
                        
                    }
                    
                    i = i + 9;
                }else if(tplSplits[i] === `Variable`){
                    if(tplSplits[i + 7].split(`=`)[1] !== ``){
                        loopKey = tplSplits[i + 2].split(`=`)[1];
                        loopValue = tplSplits[i + 7].split(`=`)[1];
                        if(loopValue !== ``){
                            loopIndex = outData.findIndex( z => z.Key === loopKey);
                            if(loopIndex === -1){
                                outData.push({
                                    Key: loopKey
                                    , Value: loopValue
                                });
                            }else{
                                outData[loopIndex].Value = loopValue;
                            }
                        }
                        
                        //Log(`${tplSplits[i + 2].split(`=`)[1]},${tplSplits[i + 7].split(`=`)[1]},`);
                    }
                    
                    i = i + 9;
                }
            }
            //Log(tplSplits);
            outData.splice(0, 0, {
                Key: `templateName`
                , Value: InRelativeFilePath
            });
            ParsedData[`TPL`].push(outData);
        }catch(err){ /*console.error(err);*/ }
        
        
    }else{
        outData = ParsedData[`TPL`][tplIndex];
        Log(`Exists`);
    }

    return outData;
}


module.exports = {
    ParserFunctionPtr: {
        DBR: DbrParse
        , DefaultDBR: DbrParse
    },
    StringifyFunctionPtr: {
        DBR: DbrStringify
    },

    DbrParse,
    DbrStringify,

    EPathEnum,
    GetPathGrimDawn,


    /**
     * Gets parser type from file extension and parses file if it has not yet been added to ParsedData, if it has been added it just returns the data without parsing it.
     * @param {string} InFilePath filepath of file to parse and append.
     * @param {Object} InOptions additional params for parser. (ex dbr could have bCheckModFirst)
     * @param {boolean} InOptions.bReturnFullDbrInfo 
     * @param {boolean} InOptions.bCheckModFirst 
     * 
     * @returns {TMap|{}} parsed file data.
     */
    GetParsedData: function(InFilePath, InOptions, bInGetReference = true){
        InOptions = Object.assign({
            bReturnFullDbrInfo: false
        }, InOptions);
        let outDataEntry = new TMap()
            , tempDataEntry
            , entryKey = `JSON`
            , entryIndex;

        // DBR
        if(InFilePath.endsWith(`.dbr`)){
            entryKey = `DBR`;
        }
        entryKey = InOptions.EntryKeyOverride || entryKey;
        
        ParsedData[entryKey] = ParsedData[entryKey] || [];
        if(InFilePath.startsWith(`/`)){
            entryIndex = ParsedData[entryKey].findIndex( x => x.RelativeFilePath === InFilePath );
        }else{
            //relativeFilePath = InDbrFilePath.replace(GetPathGrimDawn(EPathEnum.ModDBR), ``);
            //relativeFilePath = InDbrFilePath.replace(GetPathGrimDawn(EPathEnum.CoreDBR), ``);
            entryIndex = ParsedData[entryKey].findIndex( x => x.RelativeFilePath === InFilePath.replace(GetPathGrimDawn(EPathEnum.ModDBR), `/`) );
            if(entryIndex === -1) entryIndex = ParsedData[entryKey].findIndex( x => x.RelativeFilePath === InFilePath.replace(GetPathGrimDawn(EPathEnum.CoreDBR), `/`) );
        }
        //Log(InFilePath);
        
        if(entryIndex === -1){ // entry doen't exist, make new one.
            tempDataEntry = this.ParserFunctionPtr[entryKey](InFilePath, InOptions);
            //Log(tempDataEntry);
            if(tempDataEntry){ // check if parse was successful
                let newIndex = ParsedData[entryKey].push(tempDataEntry) - 1;
                if(bInGetReference){
                    outDataEntry = ParsedData[entryKey][newIndex]; // we want the ref not a new array.
                }else{
                    outDataEntry = JSON.parse(JSON.stringify(ParsedData[entryKey][newIndex]));
                }
                
            }
        }else{ // entry exists, just return it without further actions.
            //Log(`k`);
            if(bInGetReference){
                outDataEntry = ParsedData[entryKey][entryIndex];
            }else{
                outDataEntry = JSON.parse(JSON.stringify(ParsedData[entryKey][entryIndex]));
            }
            
        }
        //Log(ParsedData[entryKey]);

        return (InOptions.bReturnFullDbrInfo) ? outDataEntry : outDataEntry.Data;
    },

    /**
     * 
     */
    AddParsedDbr: function(InRelativePath, InData)
    {
        // ---
        let entryKey = `DBR`
            , dbrData = JSON.parse(JSON.stringify(Array.from(InData)));

        ParsedData[entryKey] = ParsedData[entryKey] || [];

        let entryIndex = ParsedData[entryKey].findIndex( x => x.RelativeFilePath === InRelativePath );
        //Log(InRelativePath);
        if(entryIndex === -1){
            ParsedData[entryKey].push({
                AbsoluteFilePath: `${GetPathGrimDawn(EPathEnum.ModDBR)}${InRelativePath}`
                , RelativeFilePath: InRelativePath
                , Data: dbrData
            });
        }else{
            ParsedData[entryKey][entryIndex] = {
                AbsoluteFilePath: `${GetPathGrimDawn(EPathEnum.ModDBR)}${InRelativePath}`
                , RelativeFilePath: InRelativePath
                , Data: dbrData
            };
        }
        //Log( ParsedData[entryKey] );
    },

    /**
     * Makes a ParsedDBR entry from DefaultDBR (ParsedDBR are saved with Save DBR).
     * @param {string} InNewDbrPath relative path for DBR, must start with / .
     * @param {TMap} InNewDataMap data to insert into defaultDBR.
     * @param {string} InDefaultDbrName uses defaultDBR with that name.
     */
    MakeParsedDbr: function(InNewDbrPath, InNewDataMap, InDefaultDbrName)
    {
        this.AddParsedDbr(`${InNewDbrPath}`, this.UseDefaultDbr(InDefaultDbrName, InNewDataMap) );
    },

    WriteParsedData: function(InEntryKey, bInCheckForChanges = true)
    {
        if(typeof ParsedData[InEntryKey] === `undefined`) return false;

        let bOutSuccess = false
            , loopDbrStr
            , loopDbrCore
            , bFileUnchanged = false;

        for(let i = 0; i < ParsedData[InEntryKey].length; i++){
            bFileUnchanged = false;
            loopDbrStr = this.StringifyFunctionPtr[InEntryKey](ParsedData[InEntryKey][i].Data); // prepare file output.
            // if we need to check for changes to the file.
            if(bInCheckForChanges){
                try{
                    if(!bFileUnchanged && ParsedData[InEntryKey][i].RelativeFilePath.endsWith(`.dbr`)){
                        //Log(DbrStringify(DbrParse(`${GetPathGrimDawn(EPathEnum.CoreDBR)}${ParsedData[InEntryKey][i].RelativeFilePath}`, 'utf-8').Data) === loopDbrStr);
                        //Log();
                        //loopDbrCore = DbrParse(`${GetPathGrimDawn(EPathEnum.CoreDBR)}${ParsedData[InEntryKey][i].RelativeFilePath}`, 'utf-8');
                        //Log(loopDbrCore);
                        if(DbrStringify(DbrParse(`${GetPathGrimDawn(EPathEnum.CoreDBR)}${ParsedData[InEntryKey][i].RelativeFilePath}`, 'utf-8').Data) === loopDbrStr){
                            bFileUnchanged = true;
                            //Log(`exists`);
                        }
                    }
                }catch(err){};
                if(!bFileUnchanged){
                    try{
                        if(fs.readFileSync(ParsedData[InEntryKey][i].AbsoluteFilePath, 'utf-8') === loopDbrStr){
                            bFileUnchanged = true;
                        }
                    }catch(err){ /*console.error(err);*/ }
                }
            }
            // file was changed, we save the updated version.
            if(!bFileUnchanged){
                fs.outputFile(ParsedData[InEntryKey][i].AbsoluteFilePath, loopDbrStr, 'utf8', function(err) {
                    if(err) {
                        console.warn(err);
                        // log.error(`${err}`);
                    } else {
                        //wzNotify.save(`${$filepath.replace($removeFromPath,``)}`);
                        console.info(`File Saved: ${ParsedData[InEntryKey][i].RelativeFilePath}`);
                        bOutSuccess = true;
                    }
                });
            }
            
        }

        return bOutSuccess;
    },

    /**
     * Updates dataArray
     * @param {string} InFilePath path to get from data.
     * @param {string} InKey Key to find & update.
     * @param {string|Array} InValue new value to save.
     * @param {Object} InOptions Getter Options.
     * @param {string} InOptions.EntryKeyOverride override for dbr could be 'DefaultDBR'.
     * 
     */
    UpdateDataFromPath: function(InFilePath, InKey, InValue, InOptions = {}){
        let dataEntry = this.GetParsedData(InFilePath, InOptions);
        
        this.UpdateData(dataEntry, InKey, InValue);
    },

    /**
     * 
     * @param {Array} OutDataEntry data ref.
     * @param {string} InKey key to find & update.
     * @param {string|Array} InValue new value to save.
     */
    UpdateData: function(OutDataEntry, InKey, InValue){
        let entryIndex = OutDataEntry.findIndex( x => x.Key === InKey );

        if(entryIndex === -1){
            OutDataEntry.push({
                Key: InKey
                , Value: InValue
            });
        }else{
            OutDataEntry[entryIndex].Value = InValue;
        }
    },

    /**
     * Appends Dbr Data and returns all data from folder.
     * @param {string|Array} InRelativeFolderPaths relative path of folder (/records/creatures)
     * @param {Object} InOptions additional args
     * @param {boolean} InOptions.bCheckModFirst if mod files should be considered [default: false]
     * @param {string|boolean} InOptions.IgnoresString ignores files including this string (like 'summon')
     * @param {string|boolean} InOptions.MustBeClass only dbrData with this class are being added to outData
     * @param {Set} InOptions.ExcludeFiles relative file paths to exclude.
     * 
     * @returns {TMap} Data from folder.
     */
    AppendDbrFolder: function(InRelativeFolderPaths, InOptions){
        InOptions = Object.assign({
            bCheckModFirst: false
            , IgnoresString: false
            , MustBeClass: false
            , MustBeTemplate: false
            , ExcludeFiles: new Set()
            , OutPaths: false
        }, InOptions);
        // let files = fs.readdirSync($filePath);
        let outData = new TMap()
            , basePaths = [`${GetPathGrimDawn(EPathEnum.CoreDBR)}`]
            , files
            , loopData;

        InRelativeFolderPaths = (Array.isArray(InRelativeFolderPaths)) ? InRelativeFolderPaths : [InRelativeFolderPaths];

        if(InOptions.bCheckModFirst) basePaths.push(`${GetPathGrimDawn(EPathEnum.ModDBR)}`);
        
        for(let i = 0; i < InRelativeFolderPaths.length; i++){
            if(!InRelativeFolderPaths[i].startsWith(`/`)) InRelativeFolderPaths[i] = `/${InRelativeFolderPaths[i]}`;
        
            // ---
            for(let j = basePaths.length -1; j >= 0; j--){
                //Log(`${basePaths[j]}${InRelativeFolderPaths[i]}`);
                try{
                    files = fs.readdirSync(`${basePaths[j]}${InRelativeFolderPaths[i]}`);
                
                    for(let k = 0; k < files.length; k++){
                        if(files[k].endsWith(`.dbr`) &&
                        !InOptions.ExcludeFiles.has(`${InRelativeFolderPaths[i].replace(/^\//g, ``)}/${files[k]}`) && 
                        ( (InOptions.IgnoresString) ? !files[k].includes(InOptions.IgnoresString) : true ) ){
                            loopData = this.GetParsedData(`${InRelativeFolderPaths[i]}/${files[k]}`, InOptions);
                            //Log(loopData.Find(`Class`));
                            if(loopData && 
                                ( (InOptions.MustBeClass) ? loopData.Find(`Class`) === InOptions.MustBeClass : true ) && 
                                ( (InOptions.MustBeTemplate) ? loopData.Find(`templateName`).toLowerCase() === InOptions.MustBeTemplate : true ) ){
                                //Log(loopData);
                                outData.push(loopData);
                                if(InOptions.OutPaths) InOptions.OutPaths.add(`${InRelativeFolderPaths[i].replace(/^\//g, ``)}/${files[k]}`);
                            }
                        }
                    }
                }catch(err){ /*console.error(err);*/ }
                
            }
        }
        
        //Log(outData);
        return outData;
    },



    /**
     * #ToDo
     */
    InitTpl: function(){
        let folders = [`database/templates`]
            , files;

        ParsedData[`TPL`] = [];

        for(let i = 0; i < folders.length; i++){
            files = fs.readdirSync(`${GetPathGrimDawn(EPathEnum.Base)}/${folders[i]}`);

            for(let j = 0; j < files.length; j++){
                if(files[j].endsWith(`.tpl`)){
                    TplParse(`${folders[i]}/${files[j]}`);
                }
            }
        }
        Log(ParsedData[`TPL`]);
    },

    /**
     * Use a DefaultDbr, make sure to init a defaultName before calling this, or use a rel file path.
     * @param {string} InDefaultName relative file path or name to access defaultDbr (@see this.SetDefaultDbr())
     * @param {TMap|Array} InData data to append.
     */
    UseDefaultDbr: function(InDefaultName, InData){
        let defaultData = this.GetParsedData(InDefaultName, {
            EntryKeyOverride: `DefaultDBR`
        }, false)
            , outDbr = new TMap()
            , appendableData;
            
        //Log(defaultData);
        outDbr.From(defaultData);
        if(typeof InData === `TMap`){
            appendableData = InData
        }else{
            appendableData = new TMap();
            if(Array.isArray(InData)){
                appendableData.From(InData);
            }else{
                return outDbr;
            }
        }

        
        outDbr.Append(appendableData);

        return outDbr;
        /*
        for(let i = 0; i < InData.length; i++){
            loopIndex = defaultData.findIndex( x => x.Key === InData[i].Key );
            if(loopIndex === -1){
                defaultData.push(InData[i]);
            }else{
                defaultData[loopIndex].Value = InData[i].Value;
            }
        }
        */
        //Log(defaultData);
    },

    GetDefaultDbr: function(InDbrPath){

    },

    /**
     * Creates a new entry for a defaultDbr with a new defaultName, this should mostly be used inside Init().
     * @param {string} InDbrFilePath relative file path to parse.
     * @param {TMap} InDefaultData data to append.
     * @param {string} InDefaultName new string to access this defaultDbr (instead of rel file path).
     */
    SetDefaultDbr: function(InDbrFilePath, InDefaultData, InDefaultName){
        let defaultData = this.GetParsedData(InDbrFilePath, {
            EntryKeyOverride: `DefaultDBR`
        })
            , parsedIndex = ParsedData[`DefaultDBR`].findIndex( x => x.RelativeFilePath === InDbrFilePath )
            , loopIndex;
        
        ParsedData[`DefaultDBR`][parsedIndex].RelativeFilePath = InDefaultName;
        defaultData.Append(InDefaultData);
        /*
        ParsedData[`DefaultDBR`][parsedIndex].AbsoluteFilePath = InDefaultName;
        for(let i = 0; i < InDefaultData.length; i++){
            loopIndex = defaultData.findIndex( x => x.Key === InDefaultData[i].Key );
            if(loopIndex === -1){
                defaultData.push(InDefaultData[i]);
            }else{
                defaultData[loopIndex].Value = InDefaultData[i].Value;
            }
        }
        */
        
        //Log(defaultData);
    }

}
