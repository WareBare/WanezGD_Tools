/**
 * Init() executed once (basically a constructor).
 * OnLoad() exectuted every time the page refreshes.
 * Discord: https://discord.gg/ru6eU2p
 */

let SourceData
    , LocaleDefs = []
    , ClassData = {
        Definitions: false
        , LibraryData: false
        , GroupData: false
        , TagInfoData: false
    }
    , bPathCorrect = false
    , GrimDawnPath = false
    , ExtractionPaths = [`resources\\Text_EN.arc`, `gdx1\\resources\\Text_EN.arc`, `gdx2\\resources\\Text_EN.arc`, `gdx3\\resources\\Text_EN.arc`];

let FilterStorage = {
    GroupData: new eConfig({name: `gd-filter-groups`})
    , TagInfoData: new eConfig({name: `gd-filter-tags`})
    , LibraryData: new eConfig({name: `gd-filter-library`})
};

let RunArchiveTool = function(){

    for(let pathIndex in ExtractionPaths){
        if(fs.pathExistsSync(`${GrimDawnPath}\\${ExtractionPaths[pathIndex]}`)){
            child_process.execSync(`"${GrimDawnPath}\\ArchiveTool.exe" "${GrimDawnPath}\\${ExtractionPaths[pathIndex]}" -extract "${dirUserData}\\resources"`);
        }
        /*
        fs.pathExists(`${GrimDawnPath}\\${ExtractionPaths[pathIndex]}`, (err, bInExists) => {
            if(err){
                console.error(err);
                return;
            }
            if(bInExists){
                child_process.exec(`"${GrimDawnPath}\\ArchiveTool.exe" "${GrimDawnPath}\\${ExtractionPaths[pathIndex]}" -extract "${dirUserData}\\resources"`
                , function(err, InData) {
                    if(err){
                        console.error(err);
                        return;
                    }
                    //Log(JSON.parse(InData));
                    for(let dataIndex in InData){
                        //Super.AppendSourceData(Super.MakeData(`${InData[dataIndex]}`));
                    }
                });
            }
          });
        */
    }
    
};
let RunLocaleExtract = function(InZipFile){
    let zip = new JSZip();

    Log(`Extract Locale: ${GrimDawnPath}/localization/${InZipFile}`);

    fs.readFile(`${GrimDawnPath}/localization/${InZipFile}`, function(err, data) {
        if (err) throw err;
        zip.loadAsync(data).then(function (zip) {
            //Log(zip.files);
            for(let fileName in zip.files){
                if(fileName.includes(`tags`) || fileName.endsWith(`.def`)){
                    zip.file(fileName).async(`string`).then(function(InText){
                        //Log(InText);
                        Super.ParseTagText(InText, SourceData, fileName);
                    });
                    //Log(fileName);
                    //Log(zip.files[fileName]);
                }
            }
            Log(SourceData);
            /*
            zip.file("language.def").async("string").then(function (data) {
                let dataRows = data.split(`\n`), tempSplit, parsedData = {};


                for(let rowIndex in dataRows){
                    tempSplit = dataRows[rowIndex].split(`=`);
                    if(tempSplit[0] !== ``) parsedData[tempSplit[0]] = tempSplit[1];
                }
                parsedData[`ZipName`] = InZipFile;

                Log(parsedData);
                LocaleDefs.push(parsedData);
                if(LocaleDefs.length == InMaxCount) wzReloadCMS(10);
                //Log(LocaleDefs.length == InMaxCount);
                //if()
                //if(bInReload) wzReloadCMS(10);
            });
            */
            /*
            zip
            .generateNodeStream({type:'nodebuffer', streamFiles: true})
            .pipe(fs.createWriteStream(`${Super.GetGrimDawnPath()}/localization/community_russian_bak5.zip`))
            .on('finish', function () {
                // JSZip generates a readable stream with a "end" event,
                // but is piped here in a writable stream which emits a "finish" event.
                console.log("out.zip written.");
            });
            */
        });
    });
};


module.exports = {
    tplContent: {
        FormContainer: `<div id="WzForm"><fieldset><legend>{TITLE}</legend>{CONTENTS}</fieldset></div>`
        , TextField: `<label class="Default">{LABEL}<msg class="ErrorMsg">{ERROR_MSG}</msg><input type="text" value="{TEXT}" onChange="{ON_CHANGE_FN};" {SETTINGS} /></label>`
        , CheckBox: `<label class="CheckBox"><input type="checkbox" value="{VALUE}" onClick="{ON_CLICK_FN}" {B_CHECKED} /><span>{LABEL}</span></label>`
    },
    
    GrimDawnPath: false,
    Paths: false,

    Init: function(){
        this.InitPaths();
        this.InitData();

        //Log(LocaleDefs);
    },

    InitPaths: function(){
        GrimDawnPath = appConfig.get(`GrimDawn.Paths.Game`).replace(/\\/g, `/`);

        this.Paths = {
            Source: `${GrimDawnPath}/source/text_en`
            , Locale: `${GrimDawnPath}/localization`
            , Target: `${GrimDawnPath}/settings/text_en`
        };

    },

    InitData: function(){
        // reset source data.
        SourceData = {};

        try{
            // remove old files.
            fs.removeSync(`${dirUserData}\\resources\\text_en`);
        }catch(err){ Log(err); };

        // load new files, depending on locale settings.
        if(this.IsUsingLocale()){
            RunLocaleExtract(appConfig.get(`Filter.LocaleFileName`));
        }else{
            RunArchiveTool();
        }
        

        new Promise(function(OutResolve, OutErr){ 
            OutResolve(Super.GatherTagFiles());
        }).then(function(){
            // only uncomment if source data is required on the first page. Will be ready in time otherwise.
            //wzReloadCMS(10);
        });

    },

    OnLoad: function(){
        bPathCorrect = fs.pathExistsSync(`${this.GetGrimDawnPath()}\\ArchiveTool.exe`);

        if(!ClassData[`TagInfoData`]) ClassData[`TagInfoData`] = this.MakeTagInfoData();
        if(!ClassData[`Definitions`]) ClassData[`Definitions`] = this.MakeDefinitions();

        Log(ClassData[`Definitions`]);

        if(!ClassData[`LibraryData`]) ClassData[`LibraryData`] = this.MakeLibraryData();
        if(!ClassData[`GroupData`]) ClassData[`GroupData`] = this.MakeFilterGroupsData();
    },

    MakeTagInfoData: function(){
        Log(`Making Tag Data!`);
        let OutTagData = appData[`gd-filter`].Tags;
        
        return OutTagData;
    },
    MakeLibraryData: function(){
        Log(`Making Library Data!`);
        let OutLibraryData = appData[`gd-filter`].Library;
        //Log(OutLibraryData);

        return OutLibraryData;
    },
    MakeFilterGroupsData: function(){
        Log(`Making Filter Groups Data!`);
        let OutGroupsData = Object.assign({}, appData[`gd-filter`].FilterGroups, FilterStorage[`GroupData`].store);
        Log(OutGroupsData);

        return OutGroupsData;
    },
    MakeDefinitions: function(){
        let outDefinitions = {};

        for(let tagKey in ClassData[`TagInfoData`]){
            for(let tagKeyKey in ClassData[`TagInfoData`][tagKey]){
                outDefinitions[tagKeyKey] = outDefinitions[tagKeyKey] || [];
                // check if entry exists, if not add new one to array.
                if(!outDefinitions[tagKeyKey].includes(ClassData[`TagInfoData`][tagKey][tagKeyKey])){
                    outDefinitions[tagKeyKey].push(ClassData[`TagInfoData`][tagKey][tagKeyKey]);
                }
            }
        }

        return outDefinitions;
    },

    /**
     * Makes a SelectBox.
     * @param {object} InSettings wzReplace - LABEL; ON_CHANGE_FN; ITEMS
     * @param {array} InOptions Options in array as object for wzReplace - VALUE; TOOL_TIP; TEXT
     */
    MakeForm_SelectBox: function(InSettings, InOptions){
        InSettings = Object.assign({
            SIZE: 3
        }, InSettings);

        let outHtml = ``
            , tempItemHtml = ``
            , tplContainer = `<label class="Default">{LABEL}<select wzType="ListBox" onChange="{ON_CHANGE_FN}" size="{SIZE}">{ITEMS}</select></label>`
            , tplItem = `<option value="{VALUE}" title="{TOOL_TIP}"{B_CHECKED}>{TEXT}</option>`;

        //

        tempItemHtml += ``;
        for(let optionIndex in InOptions){
            tempItemHtml += tplItem.wzReplace(InOptions[optionIndex]);
        }

        outHtml += tplContainer.wzReplace(Object.assign({
            ITEMS: tempItemHtml
        }, InSettings));

        return outHtml;
    },

    MakeLocaleDefs: function(InLocaleZips){

        if(LocaleDefs.length < InLocaleZips.length){
            for(let zipIndex in InLocaleZips){
                // InLocaleZips[zipIndex]
                this.ReadDefFromLocaleAsync(InLocaleZips[zipIndex], InLocaleZips.length );
            }
        }
        //else{ Log(`No update required for Locale.def`); }
        

        return LocaleDefs;
    },

    ReadDefFromLocaleAsync: function(InZipFile, InMaxCount = 0){
        let zip = new JSZip();

        if(!LocaleDefs.includes( DefObj => DefObj.ZipName === InZipFile )){
            fs.readFile(`${Super.Paths.Locale}/${InZipFile}`, function(err, data) {
                if (err) throw err;
                zip.loadAsync(data).then(function (zip) {
                    zip.file("language.def").async("string").then(function (data) {
                        let dataRows = data.split(`\n`), tempSplit, parsedData = {};
    
    
                        for(let rowIndex in dataRows){
                            tempSplit = dataRows[rowIndex].split(`=`);
                            if(tempSplit[0] !== ``) parsedData[tempSplit[0]] = tempSplit[1];
                        }
                        parsedData[`ZipName`] = InZipFile;
    
                        //Log(parsedData);
                        LocaleDefs.push(parsedData);
                        if(LocaleDefs.length == InMaxCount) wzReloadCMS(10);
                        //Log(LocaleDefs.length == InMaxCount);
                        //if()
                        //if(bInReload) wzReloadCMS(10);
                    });
                    /*
                    zip
                    .generateNodeStream({type:'nodebuffer', streamFiles: true})
                    .pipe(fs.createWriteStream(`${Super.GetGrimDawnPath()}/localization/community_russian_bak5.zip`))
                    .on('finish', function () {
                        // JSZip generates a readable stream with a "end" event,
                        // but is piped here in a writable stream which emits a "finish" event.
                        console.log("out.zip written.");
                    });
                    */
                });
            });
        }

    },

    /**
     * Reset ClassData. Use Specfic Key to only reset a certain entry or false to Reset all ClassData.
     * @param {string|boolean} InResetSpecific Specific Key, FALSE to reset all data.
     */
    ResetClassData: function(InResetSpecific = false){
        if(!InResetSpecific){
            ClassData = {};
        }else{
            ClassData[InResetSpecific] = false;
        }
        
        this.OnLoad();
    },

    GatherTagFiles: function(){
        
        
        fs.readdir(`${dirUserData}\\resources\\text_en`, function(err, InFiles){
            for(let fileIndex in InFiles){
                if(InFiles[fileIndex].endsWith(`.txt`)){
                    //Log(InFiles[fileIndex]);
                    try{
                        Super.ParseTagText(fs.readFileSync(`${dirUserData}\\resources\\text_en\\${InFiles[fileIndex]}`, 'utf-8'), SourceData, `${dirUserData}\\resources\\text_en\\${InFiles[fileIndex]}`);
                    }catch(err){ Log(err); }
                    
                }
            }
        });
        
        
        //Log(SourceData);
        return SourceData;
    },

    MakeFilterUpdateData: function(){

    },

    ParseTagText: function(InTagText, OutFinalArray, InTagFile){
        try{
            let fileContents = InTagText
                , contentArray = fileContents.split(`\n`)
                , finalArray = [{bUpdated: false}], tempSplit;

            for(let arrayIndex in contentArray){
                tempSplit = contentArray[arrayIndex].split(`=`);
                //finalArray[tempSplit[0]] = tempSplit[1] || ``;
                
                finalArray.push({
                    TagKey: tempSplit[0]
                    , TagValue: tempSplit[1] || ``
                });
                
            }
            OutFinalArray[`${InTagFile.substring(InTagFile.replace(/\\/g, `/`).lastIndexOf('/')+1)}`] = finalArray;
            /*
            OutFinalArray.push({
                FileName: `${InTagFile.substring(InTagFile.replace(/\\/g, `/`).lastIndexOf('/')+1)}`
                , bHasChanged: false
                , Data: finalArray
            });
            */
            //Log(contentArray);
        }catch(err){ Log(err); }
    },

    AppendSourceData: function(InAppendableData){

    },

    MakeGroupEditForm: function(){

    },

    MakeData: function(InFileName, OutData){
        OutData = OutData || {};

        Log(`Current File: ${InFileName}`);

        return OutData;
    },

    IsPathCorrect: function(){
        return bPathCorrect;
    },
    /**
     * @returns {boolean} TRUE Using Locale, FALSE not using Locale
     */
    IsUsingLocale: function(){
        return appConfig.get(`Filter.bUseLocale`);
    },

    /// GETTER
    GetGrimDawnPath: function() { return GrimDawnPath || false; },
    GetSourceData: function(bInUseNewInstance = true) { return (bInUseNewInstance) ? JSON.parse(JSON.stringify(SourceData)) : SourceData; },

    GetClassData: function(InDataEntryStr){
        return JSON.parse(JSON.stringify(ClassData[InDataEntryStr]));
    },
    GetLibraryData: function(){
        return JSON.parse(JSON.stringify(ClassData[`LibraryData`]));
    },



    /**
     * 
     * @param {string} InDataKey config to get or update.
     * @param {string} InConfigKey the string used for get() or set().
     * @param {string|array|number} InNewValue new value for selected key, if empty get() is used.
     * @param {boolean} bInUpdateEntry TRUE will use InNewValue as key to get old data. [default: false]
     * @param {boolean} bInDeleteOldEntry TRUE will delete the old entry (used for update) [default: true]
     * @param {boolean} bInPerformReload TRUE performs wzReloadCMS() at the end of set() [default: true]
     * 
     * @returns {boolean|number|array|string} returns result when get() or TRUE if set() was successful.
     */
    ManageFilterStorage: function(InDataKey, InConfigKey, InNewValue, bInUpdateEntry = false, bInDeleteOldEntry = true, bInPerformReload = true){
        let outResult = false;
        // FilterStorage
        if(typeof InNewValue === `undefined`){
            outResult = FilterStorage[InDataKey].get(InConfigKey);
        }else{
            //Log(FilterStorage[InDataKey].get(InConfigKey));
            //Log(InNewValue.replace(/\\\./g, `.`));
            if(bInUpdateEntry){
                let oldData = {};
                this.ReadData(oldData, InDataKey, InNewValue.replace(/\\\./g, `.`));
                if(oldData.bReadOnly) delete oldData.bReadOnly;
                outResult = FilterStorage[InDataKey].set(InConfigKey, oldData);
                Log(InNewValue);
                if(bInDeleteOldEntry) FilterStorage[InDataKey].delete(InNewValue);
            }else{
                outResult = FilterStorage[InDataKey].set(InConfigKey, InNewValue);
            }

            if(bInPerformReload) {
                this.ResetClassData(InDataKey);
                wzReloadCMS(10);
            }
        }

        return outResult;
    },

    /**
     * Reads data and returns it, or false if no matching entry was found. Changing FoundData won't change source.
     * 
     * @param {array} OutFoundData Data to return can be Array|Object.
     * @param {string} InDataStr String Referencing data array|object.
     * @param {boolean} InSearchKey Index|Key or Key to search for with value check.
     * @param {number|string|boolean} InCheckValue Value to check against, if empty a simple data return is performed if not empty find is used to get data.
     * 
     * @returns {boolean|number|string|array} TRUE if something was found, FALSE if nothing was found. OTHER if data is not an object, it will return the value directly and OutFoundData only holds InSearchKey|OutValue.
     */
    ReadData: function(OutFoundData, InDataStr, InSearchKey, InCheckValue = ``){
        Object.assign(OutFoundData, {'InSearchKey': InSearchKey});
        let bOutFound = false;
        
        if(!ClassData[InDataStr]) return false;
        
        if(InCheckValue === ``){

            //bOutFound = (typeof ClassData[InDataStr][InSearchKey] === `undefined`) ? false : true;

            if(bOutFound = (typeof ClassData[InDataStr][InSearchKey] === `undefined`) ? false : true){
                if(Array.isArray(ClassData[InDataStr][InSearchKey]) || typeof ClassData[InDataStr][InSearchKey] === `string` || typeof ClassData[InDataStr][InSearchKey] === `number` || typeof ClassData[InDataStr][InSearchKey] === `boolean`){
                    Object.assign(OutFoundData, {OutValue: ClassData[InDataStr][InSearchKey]});
                }else{
                    Object.assign(OutFoundData, ClassData[InDataStr][InSearchKey]);
                }
            }
            
        }else{
            let tempIndex = ClassData[InDataStr].findIndex( SearchFor => SearchFor[InSearchKey] === InCheckValue );
            bOutFound = !(tempIndex === -1);
            Object.assign(OutFoundData, {'InSearchKey': tempIndex}, ClassData[InDataStr][tempIndex]);
        }

        return bOutFound;
    },

    content_: function(){
        let Output = ``;
        
        return Output;
    },
    sidebar_: function(){
        let Output = ``;
        
        return Output;
    }
    
};

/*
Usage examples for ReadData:

let MyLibraryData = {};
if(!Super.ReadData(MyLibraryData, `LibraryData`, `PackageName`, `fullRainbow`)) Log(`ERROR!`);
MyLibraryData.Data = `NEW`;
Log(MyLibraryData);

MyLibraryData = {};
if(!Super.ReadData(MyLibraryData, `LibraryData`, `PackageName`, `fullRainbow`)) Log(`ERROR!`);
Log(MyLibraryData);

MyLibraryData = {};
if(!Super.ReadData(MyLibraryData, `TagInfoData`, `tagRetaliationModifierTotalDamage`)) Log(`ERROR!`);
Log(MyLibraryData);

MyLibraryData = {};
if(!Super.ReadData(MyLibraryData, `TagInfoData`, `tagTest`)) Log(`ERROR!`);
MyLibraryData.OutValue = 9;
Log(MyLibraryData);

MyLibraryData = {};
if(!Super.ReadData(MyLibraryData, `TagInfoData`, `tagTest`)) Log(`ERROR!`);
Log(MyLibraryData);
*/
