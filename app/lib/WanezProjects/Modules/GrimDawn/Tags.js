

const Parsers = require(`../Parsers.js`);
const { TMap } = require(`../../Classes`);


/**
 * FileName => ex: "mod/modtags_wanez_x.txt" mod is not a folder it just tells the saveFn this is a mod file.
 * 
 * TagKey => ex: "tagWzSword_NAME"
 * 
 * TagValue => ex: "Ancient's Sword"
 * 
 * { `{FileName}`: TMap[ { Key: `{TagKey}`, Value: `{TagValue}` } ] }
 */
let TagData = {};

const RunArchiveTool = function(){
    let ExtractionPaths = [
        `resources\\Text_EN.arc`
        , `gdx1\\resources\\Text_EN.arc`
        , `gdx2\\resources\\Text_EN.arc`
        , `gdx3\\resources\\Text_EN.arc`
        //, `survivalmode1\\resources\\Text_EN.arc`
        //, `survivalmode2\\resources\\text_en.arc`
        //, `resources\\scripts.arc`
        //, `gdx1\\resources\\scripts.arc`
        //, `gdx2\\resources\\scripts.arc`
        //, `gdx3\\resources\\scripts.arc`
    ];
    for(let pathIndex in ExtractionPaths){
        if(fs.pathExistsSync(`${Parsers.GetPathGrimDawn(Parsers.EPathEnum.Base)}\\${ExtractionPaths[pathIndex]}`)){
            child_process.execSync(`"${Parsers.GetPathGrimDawn(Parsers.EPathEnum.Base)}\\ArchiveTool.exe" "${Parsers.GetPathGrimDawn(Parsers.EPathEnum.Base)}\\${ExtractionPaths[pathIndex]}" -extract "${dirUserData}\\resources"`);
        }
    }
    
};


const Tag = {
    /**
     * Parses a string with Tag Data to a TMap, the string usually is the content from a file.
     * @param {string} InTagAsString string from file contents to parse.
     */
    Parse: function(InTagAsString){
        InTagAsString = InTagAsString.replace(/\r/g, ``);

        let outData = new TMap()
            , tagSplitByLine = InTagAsString.split(`\n`)
            , loopSplit;

        // ---
        for(let i = 0; i < tagSplitByLine.length; i++){
            if(tagSplitByLine[i].includes(`=`)){
                loopSplit = tagSplitByLine[i].split(`=`);

                outData.Add(loopSplit[0], loopSplit[1] || ``);
            }
        }

        //Log(outData);
        return outData;
    },

    /**
     * Makes Tag Data from TMap into string for saving to a file.
     * @param {TMap} TagAsTMap Tag Data to make into a string.
     */
    Stringify: function(TagAsTMap){
        let outParsedStr = ``;

        // ---
        TagAsTMap.ForEach( (It) => {
            outParsedStr += `${It.Key}=${It.Value}\r\n`;
        } );

        return outParsedStr;
    }
}

/**
 * Main function to gather data.
 * @param {string} InPrefix mod|core, decides path and how it's saved.
 * @param {string} InPath absolute path.
 */
const GatherTagData = function(InPrefix, InPath){
    let files = fs.readdirSync(`${InPath}`);
    for(let i = 0; i < files.length; i++){
        if(files[i].endsWith(`.txt`) && files[i].includes(`tag`)){
            TagData[`${InPrefix}/${files[i]}`] = Tag.Parse(fs.readFileSync(`${InPath}/${files[i]}`, 'utf-8'));
        }
    }
}

/**
 * This function is called to gather tags
 * @param {boolean} bInModTags TRUE for mod tags, FALSE for core tags.
 */
const PerformTagGathering = function(bInModTags){
    TagData = TagData || {};
    if(bInModTags){
        //Log();
        GatherTagData(`mod`, `${Parsers.GetPathGrimDawn(Parsers.EPathEnum.ModTags)}`);
    }else{
        RunArchiveTool();
        GatherTagData(`core`, `${dirUserData}/resources/text_en`);
    }
}


/**
 * Gets tags for a certain file.
 * @param {string} InDataKey ex: mod/modtags_wanez_x.txt or modtags_wanez_x.txt, mod will be checked first then core
 * 
 * @returns {TMap} if nothing was found it return an empty TMap to not stop the script, but a warning will be thrown.
 */
const GetTags = function(InDataKey){
    if(!InDataKey.includes(`/`)) InDataKey = `mod/${InDataKey}`;
    if(typeof TagData[InDataKey] === `undefined`) {
        if(InDataKey.startsWith(`mod/`)) InDataKey = InDataKey.replace(`mod/`, `core/`);
        if(typeof TagData[InDataKey] === `undefined`) console.error(`Could not find Tags to return: ${InDataKey}`);
        
    }
    return TagData[InDataKey] || new TMap();
}


/**
 * Finds a Value to a Key in any file.
 * @param {string} InTagKey Key to find.
 * 
 * @returns {string} found Value.
 */
const FindTag = function(InTagKey){
    // #ToTest FindTag()
    let outValue;

    for(let dataKey in TagData){
        //Log(TagData[dataKey]);
        outValue = TagData[dataKey].Find(InTagKey);
        if(typeof outValue !== `undefined`) break;
    }

    return outValue;
}

/**
 * Updates a Tag, won't add it. First it checks if file .Conatins a tag with the key, then it uses .Add value for specified key, in which case it updates the tag.
 * @param {string} InTagKey key to find
 * @param {string} InTagValue new value to update with
 * 
 * @returns {boolean} TRUE if tag was updated.
 */
const UpdateTag = function(InTagKey, InTagValue){
    // #ToTest UpdateTag()
    let bUpdated = false;

    for(let dataKey in TagData){
        bUpdated = TagData[dataKey].Contains(InTagKey);
        if(outValue){
            TagData[dataKey].Add(InTagKey, InTagValue);
            break;
        }
    }

    return bUpdated;
}

/**
 * 
 * @param {Object} InTagData 
 * @param {string} InTagData.DataKey ex: mod/modtags_wanez_x.txt
 * @param {TMap} InTagData.Data Key/Value pairs with tag info
 */
const AddTagsToFile = function(InTagData){
    // #ToTest AddTagsToFile()
    TagData[InTagData.DataKey] = TagData[InTagData.DataKey] || new TMap();
    TagData[InTagData.DataKey].Append(InTagData.Data);
}


/**
 * Saves all tags with 'mod/' prefix
 */
const SaveTags = function(){
    // #ToTest SaveTags()
    for(let dataKey in TagData){
        if(dataKey.startsWith(`mod/`)){
            fs.outputFile(`${Parsers.GetPathGrimDawn(Parsers.EPathEnum.ModTags)}/${dataKey.replace(`mod/`, ``)}`, `# File was generated by script, sorry for any inconvenience with translations, let me (WareBare) know about them, so I can make adjustments for the future.\r\n\r\n${Tag.Stringify(TagData[dataKey])}`, 'utf8', function(err) {
                if(err) {
                    console.error(err);
                } else {
                    //wzNotify.save(`${$filepath.replace($removeFromPath,``)}`);
                    console.info(`File Saved: ${dataKey}`);
                }
            });
        }
    }
}



module.exports = {
    Tag,
    PerformTagGathering,
    GetTags,
    FindTag,
    UpdateTag,
    AddTagsToFile,
    SaveTags
}
