/**
 * Init() executed once (basically a constructor).
 * OnLoad() exectuted every time the page refreshes.
 */

let SourceData
    , LocaleDefs = []
    , ClassData = {
        Definitions: false
        , LibraryData: false
        , GroupData: false
        , TagInfoData: false
        , KeywordSymbols: false
        , ImportantTags: false
    }
    , bPathCorrect = false
    , GrimDawnPath = false
    , ExtractionPaths2 = [
        `Text_${appConfig.get(`RadioGroupStorage.Language`).toUpperCase()}.arc`
    ]
    , ExtractionPaths = [
        `resources\\Text_EN.arc`
        , `gdx1\\resources\\Text_EN.arc`
        , `gdx2\\resources\\Text_EN.arc`
        , `gdx3\\resources\\Text_EN.arc`
        //, `survivalmode1\\resources\\Text_EN.arc`
        //, `survivalmode2\\resources\\text_en.arc`
    ];

let FilterStorage = {
    GroupData: new eConfig({name: `gd-filter-groups`})
    , TagInfoData: new eConfig({name: `gd-filter-tags`})
    , LibraryData: new eConfig({name: `gd-filter-library`})
    , KeywordSymbols: new eConfig({name: `gd-filter-symbols`})
    , ImportantTags: new eConfig({name: `gd-filter-important`})
};

const { RunArchiveTool } = LoadSubModule(`GrimDawn_ArchiveTool`);

const CheckForGameProcess = function(InCallbackFnPtr)
{
    let psPromise = psList();
    let bFoundProcess = false;

    psPromise.then( (InProcesses) => {
        if(Array.isArray(InProcesses)){
            if(InProcesses.findIndex( (el) => el.name.includes(`Grim Dawn.exe`) ) !== -1 ){
                //console.log(`found process`);
                bFoundProcess = true;
            }
            //console.log(InProcesses);
        }
    } );
    psPromise.finally( () => {
        InCallbackFnPtr(bFoundProcess);
    });
};

let bMustReloadSpecialHighlighting = true;

let RunLocaleExtract = function(InZipFile){
    let zip = new JSZip();

    fs.readFile(`${GrimDawnPath}/localization/${InZipFile}`, function(err, data) {
        if (err)
        {
            console.log(`do something`);
            throw err;
        }


        zip.loadAsync(data).then(function (zip) {
            for(let fileName in zip.files){
                if(fileName.includes(`tags`) || fileName.endsWith(`.def`)){
                    zip.file(fileName).async(`string`).then(function(InText){
                        Super.ParseTagText(InText, SourceData, fileName, false);
                    });
                }
            }
            bMustReloadSpecialHighlighting = true;
            wzReloadCMS(10);
        });
    });
    
};

let MasteryNames = false;
let bInitializedSource = false;
let bInitializedMasteryNames = false;
let bUsingInternalTags = false;
let bGameIsRunning = false;

module.exports = {
    OnClick_CollapsibleBTN: function(el){
        let collapsibleContentsElement = el.parentNode.parentNode.childNodes[1];
        
        if(collapsibleContentsElement.style.display === `none`){
            collapsibleContentsElement.style.display = `block`;
            el.innerHTML = `-`;
        }else{
            collapsibleContentsElement.style.display = `none`;
            el.innerHTML = `+`;
        }
    },

    GrimDawnVersion: `1.2.1.6`,
    LastItemVersion: `1.2.1.6`,

    //  data-wztip="{TOOL_TIP}" data-wztip-position="top"
    tplContent: {
        FormContainer: `<div id="WzForm"><fieldset><legend>{TITLE}</legend>{CONTENTS}</fieldset></div>`
        , TextField: `<label class="Default">{LABEL}<msg class="ErrorMsg">{ERROR_MSG}</msg><input type="text" value="{TEXT}" onChange="{ON_CHANGE_FN};" {SETTINGS} /></label>`
        , TextFieldWithTip: `<label data-wztip='{TOOL_TIP}' data-wztip-position="right" class="Default">{LABEL}<msg class="ErrorMsg">{ERROR_MSG}</msg><input type="text" value="{TEXT}" onChange="{ON_CHANGE_FN};" {SETTINGS} /></label>`
        , CheckBox: `<label class="CheckBox"><input type="checkbox" value="{VALUE}" onClick="{ON_CLICK_FN}" {B_CHECKED} /><span>{LABEL}</span></label>`
        , CheckBoxWithTip: `<label data-wztip='{TOOL_TIP}' data-wztip-position="top" class="CheckBox"><input type="checkbox" value="{VALUE}" onClick="{ON_CLICK_FN}" {B_CHECKED} /><span>{LABEL}</span></label>`
        , CollapsibleContainer: `<details class="DefaultDetails"{B_OPEN}><summary>{TITLE}</summary><div>{CONTENTS}</div></details>`
        //, CollapsibleContainer: `<fieldset class="Collapsible"><legend><span class="CollapsibleBTN" onClick="Super.OnClick_CollapsibleBTN(this);">+</span> {TITLE}</legend><div class="CollapsibleContents" style="display: none;">{CONTENTS}</div></fieldset>`
        , TextArea: `<label class="Default">{LABEL}<textarea onBlur="{ON_CHANGE_FN}">{VALUE}</textarea></label>`
        , TextAreaWithTip: `<label class="Default" data-wztip='{TOOL_TIP}' data-wztip-position="right">{LABEL}<textarea onBlur="{ON_CHANGE_FN}" placeholder="{PLACEHOLDER}">{VALUE}</textarea></label>`
    },

    GrimDawnPath: false,
    Paths: false,

    Init: function(){

        this.InitPaths();
        this.InitData();

        wzGetSubsystem(`RainbowFilter`);

        //Log(LocaleDefs);
    },

    InitPaths: function(){
        GrimDawnPath = appConfig.get(`GrimDawn.Paths.Game`).replace(/\\/g, `/`);
        //console.error(GrimDawnPath);

        this.Paths = {
            Source: `${GrimDawnPath}/source/text_${appConfig.get(`RadioGroupStorage.Language`)}`
            , Locale: `${GrimDawnPath}/localization`
            , Target: `${GrimDawnPath}/settings/text_${appConfig.get(`RadioGroupStorage.Language`)}`
        };

    },

    InitData: function(){
        // reset source data.
        SourceData = {};
        bInitializedMasteryNames = false;

        try{
            // remove old files.
            fs.removeSync(`${dirUserData}\\resources\\text_${appConfig.get(`RadioGroupStorage.Language`)}`);
        }catch(err){ Log(err); };

        bInitializedSource = false;
        // load new files, depending on locale settings.
        /*
        if(this.IsUsingLocale()){
            bUsingInternalTags = false;
            bGameIsRunning = false;
            bInitializedSource = true;
            wzUpdateHeader(`Parsing Localization...`);
            RunLocaleExtract(appConfig.get(`Filter.LocaleFileName`));
        }else{
        */
            bGameIsRunning = false;
            bUsingInternalTags = false;
            RunArchiveTool(GrimDawnPath, dirUserData, ExtractionPaths2, (bInError) => {
                wzUpdateHeader(`Extracting Text Files...`);
                if (bInError){
                    //console.error(`finished Extraction but ran into some errors`);
                    CheckForGameProcess( (bInFoundGame) => {
                        if(bInFoundGame){
                            //console.warn(`game found`);
                            bGameIsRunning = true;
                        }else{
                            //console.log(`no game is running`);
                        }
                        //wzUpdateHeader(`Copying Text Files...`);
                        //fs.copySync('./app/assets/text_en', `${dirUserData}\\resources\\text_en`);
                        bUsingInternalTags = true;
                        
                        wzReloadCMS(10);
                    } );
                }else{
                    //console.log(`finished Extraction without errors`);
                }
            });
            new Promise(function(OutResolve, OutErr){ 

                OutResolve(Super.GatherTagFiles());
            }).finally(function(){
                // only uncomment if source data is required on the first page. Will be ready in time otherwise.
                bInitializedSource = true;// console.log(SourceData);
                wzReloadCMS(10);
            });
        //}
        
        
        

    },

    OnRadioGroupChange: function (InElement, InForceReload = false)
    {
        const elementName = InElement.name;
        const elementValue = InElement.value;

        if (elementName === ``) return; 
        if (elementValue === ``) return;

        appConfig.set(`RadioGroupStorage.${elementName}`, elementValue);
        
        if (InForceReload === true)
        {
            /*
            this.MasteryNames = false;
            this.bInitializedSource = false;
            this.bInitializedMasteryNames = false;
            this.bUsingInternalTags = false;
            wzReloadCMS(10);
            */
            //this.OnLoad();
            location.reload();
        }
        //wzReloadCMS(10);
    },

    /**
     * @param {Object} InGroupOptions General Group Settings
     * @param {Boolean} InGroupOptions.bForceReload Forces reload (TRUE) [default: FALSE]
     * @param {String} InGroupOptions.bUseListBox Uses traditional RadioButtons (FALSE) or a ListBox (TRUE) [default: false]
     * @param {String} InGroupOptions.ElementName Name of this group for saving purposes.
     * @param {String} InGroupOptions.GroupText Text used inside Fieldset Legend as group name. (No Fieldset if empty)
     * @param {String} InGroupOptions.DefaultValue Value used if nothing has been selected. (uses first array entry if false)
     * @param {[Object]} InGroupData Array with `Value`/`Text` Object (also supports `ToolTip`).
     * @param {String} InGroupData.Text Visible text.
     * @param {String} InGroupData.Value Value stored in config file. (uses Text when false)
     * @param {String} InGroupData.ToolTip Generates a ToolTip when set.
     * 
     * @return {String} resulting string.
     */
    MakeRadioGroup: function (InGroupOptions, InGroupData, InDefaultValue = false)
    {
        InGroupOptions = InGroupOptions || {};
        let bForceReload = InGroupOptions.bForceReload || false;

        let groupFieldset = `<div id="WzForm"><fieldset><legend>{GROUP_TEXT}</legend>{CONTENTS}</fieldset></div>`;
        let radioButtonTemplate = `<label data-wztip='{TOOL_TIP}' data-wztip-position="top" class="CheckBox"><input type="radio" name="{NAME}" value="{VALUE}" onClick="{EVENT}" {B_CHECKED} /><span>{TEXT}</span></label>`;

        if (typeof appConfig.get(`RadioGroupStorage.${InGroupOptions.ElementName}`) === `undefined`)
        {
            appConfig.set(`RadioGroupStorage.${InGroupOptions.ElementName}`, InGroupOptions.DefaultValue);
        }
        const defaultValue = appConfig.get(`RadioGroupStorage.${InGroupOptions.ElementName}`);

        let strOutput = ``;
        let radioItemOutput = ``;

        if (InGroupOptions.bUseListBox === true)
        {
            groupFieldset = `<label class="Default">{GROUP_TEXT}<select wzType="ListBox" name="{NAME}" onChange="{EVENT}" size="{SIZE}">{CONTENTS}</select></label>`
            radioButtonTemplate = `<option data-wztip="{TOOL_TIP}" data-wztip-position="right" name="{NAME}" value="{VALUE}" {B_CHECKED}>{TEXT}</option>`;
        }

        // Make RadioButtons/ListItems.
        for (let groupIndex = 0; groupIndex < InGroupData.length; groupIndex++) {
            const element = InGroupData[groupIndex];
            const elementValue = element.Value || element.Text;

            radioItemOutput += radioButtonTemplate.wzReplace({
                NAME: InGroupOptions.ElementName
                , VALUE: elementValue
                , TEXT: element.Text
                , TOOL_TIP: element.ToolTip || ``
                , B_CHECKED: (defaultValue === elementValue || groupIndex === 0) ? ` CHECKED SELECTED` : ``
            });
        }
        
        // Add RadioButtons/ListItems to container.
        if (typeof InGroupOptions.GroupText === `undefined` && InGroupOptions.bUseListBox !== true)
        {
            
            strOutput += radioItemOutput;
        }
        else
        {
            strOutput += groupFieldset.wzReplace({
                NAME: InGroupOptions.ElementName
                , GROUP_TEXT: InGroupOptions.GroupText || ``
                , CONTENTS: `${radioItemOutput}`
                , SIZE: InGroupData.length
            });
        }

        strOutput = strOutput.wzReplace({
            EVENT: `Super.OnRadioGroupChange(this, ${bForceReload})`
        });
        
        return strOutput;
    },

    FindPathToFile: function (InFileName, InDirectories)
    {
        const window = remote.getCurrentWindow();
        const baseDirectories = InDirectories || ["/", "D:/"];

        let resultDir = false;

        for (let dirIndex = 0; dirIndex < baseDirectories.length; dirIndex++) {
            const element = baseDirectories[dirIndex];
            
            if (fs.existsSync(`${element}\\${InFileName}`))
            {
                resultDir = element;
            }
            else
            {
                console.log(`so far so good`);
                try
                {
                    let resultingData = child_process.execSync(`${element.slice(0, 2)} && cd "${element.replace(`\\`, `/`)}" && dir ${InFileName.replace(` `, `?`)} /s`).toString();
    
                    const foundDir = resultingData.split(`Directory of `);
    
                    if (foundDir.length > 1)
                    {
                        for (let i = 1; i < foundDir.length; i++) {
                            const element = foundDir[i].split(/\r?\n/g);
                            
                            resultDir = element[0];
                            //console.log(element[0]);
                            break;
                        }
                    }
                }
                catch (err)
                {
                    console.warn(`unable to find file ${InFileName} in ${element}`);
                    //console.error(err);
                }
            }

            if (resultDir)
            {
                break;
            }
        }
        

        return resultDir;
    },

    GetValueFromRegistry: function (InRegistryPath, InRegistryName)
    {
        let resultValue;

        try 
        {
            let resultingData = child_process.execSync(`REG QUERY "${InRegistryPath}"`).toString();

            const splitData = resultingData.split(/\r?\n/g);

            for (let dataIndex = 0; dataIndex < splitData.length; dataIndex++) {
                // #ToDo find a better way than x number of whitespaces.
                const element = splitData[dataIndex].trim().split(`    `);

                if (element.length < 2) continue;
                if (element[0].startsWith(InRegistryName) === false) continue;

                resultValue = element[2];
                break;
            }
        } 
        catch (err) 
        {
            console.warn(`unable to find entry ${InRegistryName} in ${InRegistryPath}`);
            //console.error(err);
        }
        
        //console.log(resultValue);
        return resultValue;
    },

    SetCMSForPathCorrect: function(bInPathCorrect){
        let pathsToAdd = [`Filter/Settings/Manage Tags`, `Filter/Settings/Manage Groups`, `Filter/Library`, `Filter/Library/Special Highlighting`, `Filter/Library/Mastery Marker`]
            , enablerData = appConfig.get(`Enablers`) || []
            , loopIndex
            , bForceReload = false;

        for(let i = 0; i < pathsToAdd.length ; i++){
            loopIndex = enablerData.findIndex( x => x === pathsToAdd[i] );
            //Log(loopIndex);

            
            if(bInPathCorrect){
                if(loopIndex === -1){
                    enablerData.push(pathsToAdd[i]);
                    bForceReload = true;
                }
            }else{
                if(loopIndex !== -1){
                    enablerData.splice(loopIndex, 1);
                    bForceReload = true;
                }
            }
        }

        if(bForceReload){
            appConfig.set(`Enablers`, enablerData);
            //location.reload();
            RefreshNav();
        }
    },

    OnLoad: function(){
        bGameIsRunning = false;
        CheckForGameProcess( (bInFoundGame) => {
            if(!bInitializedSource){
                wzUpdateHeader(`ERROR: Text Source could not be generated!`);
            }else if(bInFoundGame){
                //console.warn(`game found`);
                bGameIsRunning = true;
                if (bUsingInternalTags){
                    wzUpdateHeader(`Currently using internal Texts. Close Grim Dawn and reload the tool to extract up-to-date files.`);
                }else{
                    wzUpdateHeader(`You should close Grim Dawn for full functionality!`);
                }
            }else{
                //console.log(`no game is running`);
                if (bUsingInternalTags){
                    wzUpdateHeader(`Currently using internal Texts. This is a workaround for an error. ("Run As Admin" might fix this)`);
                }else{
                    wzUpdateHeader(`No Errors!`);
                }
            }
        } );


        //bPathCorrect = fs.pathExistsSync(`${this.GetGrimDawnPath()}/ArchiveTool.exe`);
        //bPathCorrect = fs.existsSync(`${this.GetGrimDawnPath()}/ArchiveTool.exe`);
        // fs.pathExistsSync(`${GrimDawnPath}/${ExtractionPaths[pathIndex]}`)
        //bPathCorrect = false;
        bPathCorrect = fs.existsSync(`${this.GetGrimDawnPath()}/ArchiveTool.exe`);
        
        /*
        try{
            //Log(`here`);
            //Log(fs.existsSync(`${this.GetGrimDawnPath()}/ArchiveTool.exe`));
            fs.existsSync(`${this.GetGrimDawnPath()}/ArchiveTool.exe`);
            //Log(`hehe`);
        }catch(err){ console.error(err); }
        */
        this.SetCMSForPathCorrect(bPathCorrect);
        //Log(bPathCorrect);
        //if(!Object.keys(SourceData).length) this.InitData();

        //this.SetCMSForPathCorrect(bPathCorrect);

        if(!ClassData[`TagInfoData`]) ClassData[`TagInfoData`] = this.MakeTagInfoData();
        if(!ClassData[`Definitions`]) ClassData[`Definitions`] = this.MakeDefinitions();

        //Log(ClassData[`Definitions`]);

        if(!ClassData[`LibraryData`]) ClassData[`LibraryData`] = this.MakeLibraryData();
        if(!ClassData[`GroupData`]) ClassData[`GroupData`] = this.MakeFilterGroupsData();

        // KeywordSymbols
        if(!ClassData[`KeywordSymbols`]) ClassData[`KeywordSymbols`] = this.MakeFilterKeywordSymbols();
        if(!ClassData[`ImportantTags`]) ClassData[`ImportantTags`] = this.MakeImportantTags();
        //AddToolTips();
        //if (!MasteryNames) MasteryNames = this.MakeMasteryNames();

        this.IsUsingLocale();
    },

    /**
     * Returns TRUE when reload is required.
     */
    MustReloadSpecialHighlighting: function()
    {
        if (!bInitializedSource) return true;
        if (typeof SourceData[`tags_skills.txt`] === `undefined`) return true;
        if (!bMustReloadSpecialHighlighting) return false;

        bMustReloadSpecialHighlighting = false;

        return true;
    },

    GetMasteryNames: function()
    {
        if (!bInitializedMasteryNames) MasteryNames = false;
        if (!bInitializedSource) return false;
        if (MasteryNames) return MasteryNames;
        if (typeof SourceData[`tags_skills.txt`] === `undefined`) return false;

        const skillFileNames = [
            `tags_skills`
            , `${(this.IsUsingLocale() ? `aom/` : ``)}tagsgdx1_skills`
            , `${(this.IsUsingLocale() ? `fg/` : ``)}tagsgdx2_skills`
        ];
        let outNames = {};

        /// Base Game
        //Log(SourceData[`tags_skills.txt`].findIndex( elTagData => elTagData.TagKey === `tagSkillClassName01` ));
        Log(`Initialize Mastery Names!`);
        //console.error(`MasteryNames`);

        let loopTagIndex
            , MasteryTag;
        for (let i = 0; i < 10; i++) {
            loopTagIndex = -1;
            MasteryTag = `tagSkillClassName${(`00${i}`).slice(-2)}`;

            skillFileNames.every(elFileIndex => {
                //if (loopTagIndex !== -1) break;
                if (typeof SourceData[`${elFileIndex}.txt`] === `undefined`) return true;

                loopTagIndex = SourceData[`${elFileIndex}.txt`].findIndex(
                    elTagData => elTagData.TagKey === MasteryTag
                );
                console.log(loopTagIndex);

                if (loopTagIndex !== -1) {
                    outNames[MasteryTag] = SourceData[`${elFileIndex}.txt`][loopTagIndex].TagValue.replace(/{\^[a-zA-Z]}/g, ``);
                    //console.log(SourceData[`${elFileIndex}.txt`][loopTagIndex].TagValue);

                    // Check if Mastery has different genders, only use first gender.
                    if(outNames[MasteryTag].startsWith(`[`)){
                        outNames[MasteryTag] = outNames[MasteryTag].split(`[`)[1].split(`]`)[1].replace(/{\^[a-zA-Z]}/g, ``);
                    }
                    
                    // Ensure Mastery is not called '?'.
                    if (outNames[MasteryTag] !== `?`) return false;
                }
                return true;
            });
        }

        MasteryNames = outNames;
        bInitializedMasteryNames = true;

        return outNames;
    },

    MakeImportantTags: function()
    {
        let outTags = FilterStorage[`ImportantTags`].store || {};

        return outTags;
    },
    MakeFilterKeywordSymbols: function(){
        let outKeywordSymbols = Object.assign({}, appData[`gd-filter`].KeywordSymbols, FilterStorage[`KeywordSymbols`].store);
        
        return outKeywordSymbols;
    },
    MakeTagInfoData: function(){
        this.CheckIntegrityForTagData();
        let OutTagData = Object.assign({}, appData[`gd-filter`].Tags, FilterStorage[`TagInfoData`].store);
        
        return OutTagData;
    },
    MakeLibraryData: function(){
        //Log(`Making Library Data!`); new eConfig({name: `gd-filter-library`})
        //FilterStorage[`LibraryData`] = new eConfig({name: `gd-filter-library`});
        let outLibraryData = []
            , LibraryStore = FilterStorage[`LibraryData`].get(`Main`);

        for(let i = 0; i < appData[`gd-filter`].Library.length; i++){
            outLibraryData.push(appData[`gd-filter`].Library[i]);
        }
        if(LibraryStore && LibraryStore.length){
            for(let i = 0; i < LibraryStore.length; i++){
                if(outLibraryData.findIndex( LibData => LibData.PackageName === `${LibraryStore[i].PackageName}`) === -1) outLibraryData.push(LibraryStore[i]);
            }
        }

        return outLibraryData;
    },
    MakeFilterGroupsData: function(){
        //Log(`Making Filter Groups Data!`);
        let OutGroupsData = Object.assign({}, appData[`gd-filter`].FilterGroups, FilterStorage[`GroupData`].store);

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
            , tplItem = `<option data-wztip="{TOOL_TIP}" data-wztip-position="top" value="{VALUE}"{B_CHECKED}>{TEXT}</option>`;

        // title="{TOOL_TIP}"

        tempItemHtml += ``;
        for(let optionIndex in InOptions){
            tempItemHtml += tplItem.wzReplace(InOptions[optionIndex]);
        }

        outHtml += tplContainer.wzReplace(Object.assign({
            ITEMS: tempItemHtml
        }, InSettings));

        return outHtml;
    },
    MakeForm_ComboBox: function(InSettings, InOptions){
        InSettings = Object.assign({
            // ---
            onChangePtr: ``
            , CheckedValue: ``
            , bUseTextAsValue: false
            , setName: ``
        }, InSettings);

        let outHtml = ``
            , tempItemHtml = ``
            , tplContainer = `<select wzType="ListBox" name="{NAME}" onChange="{ON_CHANGE_FN}">{ITEMS}</select>`
            , tplItem = `<option value="{VALUE}"{B_CHECKED}>{TEXT}</option>`;

        tempItemHtml += tplItem.wzReplace({
            VALUE: ``
            , TEXT: ``
            , B_CHECKED: (InSettings.CheckedValue === ``) ? ` SELECTED` : ``
        });
        for(let i = 0; i <= InOptions.length -1; i++){
            tempItemHtml += tplItem.wzReplace({
                VALUE: (InSettings.bUseTextAsValue) ? InOptions[i] : i
                , TEXT: InOptions[i]
                , B_CHECKED: (( (InSettings.bUseTextAsValue) ? InOptions[i] : i) === InSettings.CheckedValue) ? ` SELECTED` : ``
            });
        }

        outHtml += tplContainer.wzReplace({
            ITEMS: tempItemHtml
            , ON_CHANGE_FN: InSettings.onChangePtr
            , NAME: InSettings.setName
        });

        return outHtml;
    },

    MakeSymbol: function(InKeywordKey, InKeywordValue){
        let outStr = ``;

        if(typeof InKeywordValue !== `undefined` && appConfig.get(`Filter.bEnableSymbols`)){
            // --- Super.GetClassData(`KeywordSymbols`)[`Type.${InKeywords.Type}`] || ``
            outStr = this.GetClassData(`KeywordSymbols`)[`${InKeywordKey}.${InKeywordValue[InKeywordKey]}`] || ``;
            //Log(InKeywordValue);
        }

        return outStr;
    },
    UpdateTagInfo: function(InKey, InValue){ FilterStorage[`TagInfoData`].set(InKey, InValue); this.ResetClassData(`TagInfoData`); },
    DeleteTagInfo: function(InKey){
        FilterStorage[`TagInfoData`].delete(InKey); this.ResetClassData(`TagInfoData`);
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
                        if(LocaleDefs.findIndex( x => x.ZipName === InZipFile ) === -1){
                            LocaleDefs.push(parsedData);
                        }
                        
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

    UpdateColorCodeAssignment: function(){

    },
    ChangeAssignments: function(InKey, InDataToSave, bInRemoval = false){
        let bOutSuccess = false, curData;

        // ---
        if(Array.isArray(InDataToSave)){
            // GroupData
            InKey = InKey.replace(/\./g, `\\.`);
            //Log(`GroupKey: ${InKey}`);
            //Log(`AssignmentKey: ${InDataToSave[0]}`);
            //Log(`AssignmentValue: ${InDataToSave[1]}`);
            let curData = FilterStorage.GroupData.get(`${InKey}.Keywords.${InDataToSave[0]}`) || [];
            if(bInRemoval){
                let newData = [];
                for(let i = 0; i <= curData.length - 1; i++){
                    if(curData[i] !== InDataToSave[1]) newData.push(curData[i]);
                }
                FilterStorage.GroupData.set(`${InKey}.Keywords.${InDataToSave[0]}`, newData);
            }else{
                curData.push(InDataToSave[1]);
                //Log(curData);
                //Log(newData);
                FilterStorage.GroupData.set(`${InKey}.Keywords.${InDataToSave[0]}`, curData);
            }
            this.ResetClassData(`GroupData`);
        }else{
            // TagInfoData
        }

        return bOutSuccess;
    },

    GatherTagFiles: function(){
        let ignoreFiles = [
            "tags_achievements.txt"
            , "tags_creatures.txt"
            , "tags_skills.txt"
            , "tags_storyelements.txt"
            , "tags_tutorial.txt"
            , "tagsgdx1_achievements.txt"
            , "tagsgdx1_creatures.txt"
            , "tagsgdx1_skills.txt"
            , "tagsgdx1_storyelements.txt"
            , "tagsgdx1_tutorial.txt"
            , "tagsgdx2_achievements.txt"
            , "tagsgdx2_creatures.txt"
            , "tagsgdx2_skills.txt"
            , "tagsgdx2_storyelements.txt"
            , "tagsgdx2_tutorial.txt"
        ]
        const localeSubDirectories = [`aom`, `fg`, `foa`]
        
        const currentLanguage = appConfig.get('RadioGroupStorage.Language');
        let baseTagPath = `${dirUserData}\\resources\\text_${currentLanguage}`;

        /*
        if (currentLanguage !== `en`)
        {
            for(let j = 0; j < localeSubDirectories.length; j++){
                const elSubDirectory = localeSubDirectories[j];
                //if (bErrorOccured) break;
                const currentPath = baseTagPath;
                //break;
                //pathExistsSync
                console.log(currentPath);

                if(fs.existsSync(currentPath)) {
                    fs.moveSync(`${currentPath}\\${elSubDirectory}`, currentPath, { overwrite: true })
                }
    
            }
        }
        */
        /*
        bUsingInternalTags = false;
        try{
            fs.readdirSync(`${baseTagPath}`);
        }catch(err){
            baseTagPath = `${dirAssets}\\text_en`;
            bUsingInternalTags = true;
            console.error(err);
            Log(`use internal`);
        }

        const self = this;
        console.log(baseTagPath);
        */
       let bNeedToParseInternals = false;
       const self = this;
        try{
            let foundFiles = fs.readdirSync(`${baseTagPath}`);
            if (currentLanguage !== `en`)
            {
                for(let j = 0; j < localeSubDirectories.length; j++){
                    const elSubDirectory = localeSubDirectories[j];
                    let loopFinds;
                    //if (bErrorOccured) break;
                    const currentPath = baseTagPath;
                    //break;
                    //pathExistsSync
                    //console.log(currentPath);

                    if(fs.existsSync(`${currentPath}\\${elSubDirectory}`))
                    {
                        fs.readdirSync(`${currentPath}\\${elSubDirectory}`).forEach( loopFileName => {
                            foundFiles.push(`${elSubDirectory}/${loopFileName}`)
                        });
                    }
        
                }
            }
            //console.log(foundFiles);
            if(foundFiles.length <= 22) {
                bNeedToParseInternals = true;
            }else{
                foundFiles.forEach( (InValue, InIndex) => {
                    if(InValue.endsWith(`.txt`)){
                        try{
                            const tagFilePath = `${baseTagPath}\\${InValue}`;
                            
                            self.ParseTagText(fs.readFileSync(tagFilePath, 'utf-8'), SourceData, tagFilePath, InValue);
                        }catch(err){ 
                            console.error(err);
                        }
                    }
                });
            }
        }catch(err){
            console.error(err);
        }

        if(Object.entries(SourceData).length === 0 || bNeedToParseInternals){
            baseTagPath = `${dirAssets}\\text_${appConfig.get(`RadioGroupStorage.Language`)}`;
            bUsingInternalTags = true;
            try{
                console.warn(`Need to parse internal files at: ${baseTagPath}`);
                const foundFiles = fs.readdirSync(`${baseTagPath}`);
                
    
                foundFiles.forEach( (InValue, InIndex) => {
                    if(InValue.endsWith(`.txt`)){
                        try{
                            const tagFilePath = `${baseTagPath}\\${InValue}`;
                            
                            self.ParseTagText(fs.readFileSync(tagFilePath, 'utf-8'), SourceData, tagFilePath, InValue);
                        }catch(err){ 
                            console.error(err);
                        }
                    }
                });
            }catch(err){
                console.error(err);
            }
        }
        
        /*
        fs.readdir(`${baseTagPath}`, function(err, InFiles){
            for(let fileIndex in InFiles){
                if(InFiles[fileIndex].endsWith(`.txt`)){ //  && !ignoreFiles.includes(InFiles[fileIndex])
                    
                    try{
                        const tagFilePath = `${baseTagPath}\\${InFiles[fileIndex]}`;
                        
                        self.ParseTagText(fs.readFileSync(tagFilePath, 'utf-8'), SourceData, tagFilePath);
                    }catch(err2){ 
                        console.error(err2);
                    }
                    
                }
            }
        });
        */
        
       bMustReloadSpecialHighlighting = true;
        //Log(SourceData);
        return SourceData;
    },

    MakeFilterUpdateData: function(){

    },

    StringifyTagData: function(InTagData){
        let outStr = ``;

        // --- tagArmorClass02 ; tagTorsoB004 ; tagTorsoB005 ; tagTorsoC001
        for(let i = 1; i < InTagData.length; i++){
            outStr += InTagData[i].TagKey;
            if(InTagData[i].TagValue !== ``){
                outStr += `=${InTagData[i].TagValue}`;
            }else if(InTagData[i].TagKey !== `` && !InTagData[i].TagKey.startsWith(`#`)){
                outStr += `=`;
            }
            outStr += `\r\n`;
        }

        return outStr;
    },
    ParseTagText: function(InTagText, OutFinalArray, InTagFile, InFileKey, bInRemoveFolders = true){
        try{
            let fileContents = InTagText
                , contentArray = fileContents.split(`\n`)
                , finalArray = [{bUpdated: false}], tempSplit;

            for(let arrayIndex in contentArray){
                tempSplit = contentArray[arrayIndex].replace(`\r`, ``).split(`=`);
                //finalArray[tempSplit[0]] = tempSplit[1] || ``;
                
                finalArray.push({
                    TagKey: tempSplit[0]
                    , TagValue: tempSplit[1] || ``
                });
                
            }
            
            //OutFinalArray[`${(bInRemoveFolders) ? InTagFile.substring(InTagFile.replace(/\\/g, `/`).lastIndexOf('/')+1) : InTagFile}`] = finalArray;
            OutFinalArray[InFileKey] = finalArray;
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

    OnChange_ColorPicker: function(el, bInDefaultColor){
        let groupKey = el.name.replace(/\./g, `\\.`)
            , colorCode = el.value;
        
        if(bInDefaultColor){
            // default group colorCode
            FilterStorage.GroupData.set(`${groupKey}.ColorCode`, colorCode);
            this.ResetClassData(`GroupData`);

            wzReloadCMS(10);
        }else{
            // library color change (for group)
            //Log(groupKey);
            let dataIndex = _cms.LibraryData.Data.findIndex( SearchFor => SearchFor.GroupName === el.name );
            if(dataIndex !== -1){
                _cms.LibraryData.Data[dataIndex].ColorCode = colorCode;
                this.UpdateLibrary(_cms.contentType, _cms.LibraryData, false);
            }
        }
    },

    /**
     * Makes ColorPicker like the one in previous versions.
     * @param {string} InLabel Used in legend to give picker a name (also used to save color as grp default).
     * @param {string} InGroupKey Group Key (need escaping for dots).
     * @param {string} InSelectedColorCode currently selected color code.
     */
    MakeColorPicker: function(InLabel, InGroupKey, InSelectedColorCode, bInDisabled = false, InCustomEvent = false){
        let ColorBox_,
            ColorBoxItems_ = ``,
            ColorCodeData = appData[`gd-colorcodes`],
            tplColorBox = `<fieldset class="ColorPicker_Container"><legend>{LABEL}</legend><div class="ColorPicker">{BOX_ITEMS}</div></fieldset>`,
            tplColorBoxItem = `<label data-wztip="{COLOR_NAME} ({COLOR_CODE})" data-wztip-position="bottom"><input onChange="${(InCustomEvent == false) ? `Super.OnChange_ColorPicker(this, ${InLabel === `Default Color`})` : `${InCustomEvent}`}" value="{COLOR_CODE}" type="radio" name="${InGroupKey}" {B_DISABLED}{B_IS_CHECKED} /><span style="{COLOR_HEX}"></span></label>`;
    
        ColorBoxItems_ += ColorBoxItems_ += tplColorBoxItem.wzReplace({
            COLOR_HEX: `background-color:transparent; border: 0px;`
            , COLOR_NAME: `Clear`
            , COLOR_CODE: `Clear`
            , B_IS_CHECKED: ` checked`
            , B_DISABLED: (bInDisabled) ? ` DISABLED` : ``
        });
        for(let kColorCode in ColorCodeData){
            if(ColorCodeData[kColorCode]){
                ColorBoxItems_ += tplColorBoxItem.wzReplace({
                    COLOR_HEX: `background-color:#${ColorCodeData[kColorCode].Hex}`,
                    COLOR_NAME: ColorCodeData[kColorCode].DisplayName,
                    COLOR_CODE: kColorCode,
                    B_IS_CHECKED: (kColorCode === InSelectedColorCode) ? ` checked` : ``
                    , B_DISABLED: (bInDisabled) ? ` DISABLED` : ``
                });
            }
        }
    
        ColorBox_ = tplColorBox.wzReplace({
            LABEL: InLabel,
            BOX_ITEMS: ColorBoxItems_
        });
        
        return ColorBox_;
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
        if (appConfig.get(`Filter.bUseLocale`))
        {
            if (fs.existsSync(`${this.Paths.Locale}`) === false)
            {
                setTimeout(() => {
                    wzUpdateHeader(`You must install a language for Grim Dawn first. You cannot enable Localizations without a 'localization' folder in your Grim Dawn directory.`);
                }, 500 );

                appConfig.set(`Filter.bUseLocale`, false);
                return false;
            }

            if (fs.existsSync(`${this.Paths.Locale}/${appConfig.get(`Filter.LocaleFileName`)}`) === false)
            {
                const localeContents = fs.readdirSync(`${this.Paths.Locale}`);
                let matchingLocale = false;

                for (let localeIndex = 0; localeIndex < localeContents.length; localeIndex++) {
                    const element = localeContents[localeIndex];
                    
                    if (element.endsWith(`.zip`) && !element.endsWith(`_C_.zip`))
                    {
                        matchingLocale = element;
                        break;
                    }
                }

                if (matchingLocale)
                {
                    //console.log(matchingLocale);
                    appConfig.set(`Filter.LocaleFileName`, matchingLocale);
                }
                else
                {
                    setTimeout(() => {
                        wzUpdateHeader(`You must install a language for Grim Dawn first. If you are using the default English, disable Localizations for Rainbow Tool in Settings.`);
                    }, 500 );

                    appConfig.set(`Filter.bUseLocale`, false);
                    return false;
                }
            }
            return true;
        }

        return false;
    },

    /// GETTER
    GetGrimDawnPath: function() { return GrimDawnPath || false; },
    GetSourceData: function() { return this.SanitizeJSON(SourceData) },

    GetClassData: function(InDataEntryStr, bInSanitize = true){
        if(bInSanitize){
            return this.SanitizeJSON(ClassData[InDataEntryStr]);
        }
        return ClassData[InDataEntryStr];
    },
    GetLibraryData: function(){
        return this.SanitizeJSON(ClassData[`LibraryData`]);
    },

    ReplaceClassData: function(InDataKey, InNewData)
    {
        FilterStorage[InDataKey].store = InNewData;
    },
    SaveParsedTagData: function(InData){
        let newData = Object.assign({}, FilterStorage[`TagInfoData`].store, InData);

        this.CheckIntegrityForTagData(newData, false, true);
    },
    FetchParsedTagData: function(){
        let outStr = ``
            , tagData = FilterStorage[`TagInfoData`].store;

        for(let tagKey in tagData){
            if(outStr !== ``) outStr += `\r\n`;
            outStr += `${tagKey},${tagData[tagKey].Type},${tagData[tagKey].Classification}`;
            if(tagData[tagKey].Group && tagData[tagKey].Group !== ``) outStr += `,${tagData[tagKey].Group}`;
        }

        return outStr;
    },
    CheckIntegrityForTagData: function(InNewData, bInCheckIfExists = false, bInAlwaysUpdate = false){
        // ---
        InNewData = InNewData || FilterStorage[`TagInfoData`].store;

        let bChanged = bInAlwaysUpdate;

        for(let tagKey in InNewData){
            if(appData[`gd-filter`].Tags[tagKey]){
                if(appData[`gd-filter`].Tags[tagKey].Type === InNewData[tagKey].Type &&
                appData[`gd-filter`].Tags[tagKey].Classification === InNewData[tagKey].Classification){
                    if(appData[`gd-filter`].Tags[tagKey].Group && InNewData[tagKey].Group){
                        if(appData[`gd-filter`].Tags[tagKey].Group === InNewData[tagKey].Group){
                            delete InNewData[tagKey];
                            bChanged = true;
                            //Log(InNewData[tagKey]);
                        }
                    }else{
                        delete InNewData[tagKey];
                        bChanged = true;
                        //Log(InNewData);
                    }
                }
            }
        }

        if(bChanged){
            FilterStorage[`TagInfoData`].store = InNewData;
            this.ResetClassData(`TagInfoData`);
            wzReloadCMS(10);
        }
        
    },
    EmptyStorage: function(InStorageKey){
        FilterStorage[InStorageKey].store = {};
    },


    UpdateLibrary: function(InPackageName, InData, bInReload = true){
        let bOutSuccess = true
            , LibraryStore = FilterStorage[`LibraryData`].get(`Main`) || []
            , storeIndex = LibraryStore.findIndex( SearchFor => SearchFor.PackageName === InPackageName )
            , globalIndex = ClassData[`LibraryData`].findIndex( SearchFor => SearchFor.PackageName === InPackageName );

        //Log(storeIndex);
        //Log(globalIndex);
        if(globalIndex === -1 && InData){
            // ---
            LibraryStore.push(InData);
        }else if(storeIndex !== -1){
            if(InData){
                // ---
                LibraryStore[storeIndex] = InData;
            }else{
                // ---
                LibraryStore.splice(storeIndex, 1);
            }
        }else{
            Log(`This should not have happened!`);
            bOutSuccess = false;
        }

        //Log(FilterStorage[`LibraryData`].store);
        if(bOutSuccess){
            FilterStorage[`LibraryData`].set(`Main`, LibraryStore);
            if(bInReload){
                this.ResetClassData(`LibraryData`);
                wzReloadCMS(10);
            }
        }

        return bOutSuccess;
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
                //Log(InNewValue);
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

    OnDeleteOldFiles: function(){
        //Log(`delete old files: ${this.GetGrimDawnPath()}/settings/text_en/`);
        fs.emptyDirSync(`${this.GetGrimDawnPath()}/settings/text_${appConfig.get(`RadioGroupStorage.Language`)}`);
        
        let userDataPath = appConfig.get(`GrimDawn.Paths.UserData`);
        if(userDataPath && userDataPath !== ``){
            fs.emptyDirSync(`${userDataPath.replace(/\\/g, `/`).replace(`/Settings`, ``)}/Settings/text_${appConfig.get(`RadioGroupStorage.Language`)}`);
        }

        CheckForGameProcess( (bInFoundGame) => {
            if(bInFoundGame){
                bGameIsRunning = true;
                wzUpdateHeader(`Removed Colors! You need to restart the Grim Dawn to see the changes!`);
            }else{
                console.log(`no game is running`);
                wzUpdateHeader(`Removed Colors!`);
            }
        } );
        
    },

    SanitizeJSON(InJSONObj)
    {
        let outJSON = InJSONObj
            , stringifiedJSON = JSON.stringify(InJSONObj);

        outJSON = JSON.parse(stringifiedJSON);

        return outJSON;
    },

    OnClick_WriteColors: function()
    {
        let sourceData = this.GetSourceData();
        //sourceData = {}
        if (Object.entries(sourceData).length === 0) {
            wzUpdateHeader(`No Texts parsed to change, please report this.`);
            return false;
        }

        const filterSubsystem = wzGetSubsystem(`RainbowFilter`);

        let groupData = this.GetClassData(`GroupData`, true);
        let importantData = this.GetClassData(`ImportantTags`);

        wzUpdateHeader(`Writing Colors...`);

        setTimeout( () => {
            filterSubsystem.OnWriteColors(sourceData, groupData, importantData);
            
            CheckForGameProcess( (bInFoundGame) => {
                if(bInFoundGame){
                    bGameIsRunning = true;
                    wzUpdateHeader(`Colors Saved! You need to restart Grim Dawn to see the changes!`);
                }else{
                    //console.log(`no game is running`);
                    wzUpdateHeader(`Colors Saved!`);
                }
            } );
            
        }, 10);
        
    },

    OnClickSidebarBtn_DeleteOldColorFiles: function(){
        this.OnDeleteOldFiles();
    },

    content_: function(){
        let Output = ``;

        
        return Output;
    },
    sidebar_: function(){
        let Output = ``;
        
        return Output;
    },
    sidebarBtns_: function()
    {
        let outButtons = [];


        if(!this.IsPathCorrect()) return outButtons;
        
        
        if (Object.entries(SourceData).length !== 0 && this.IsPathCorrect()) {
            outButtons.push({
                "ONCLICK": "Super.OnClick_WriteColors()",
                "TEXT": "Save Colors"
            });
            if(!this.IsUsingLocale()){
                /// Path is correct and using Locale
                outButtons.push({
                    "ONCLICK": "Super.OnClickSidebarBtn_DeleteOldColorFiles()",
                    "TEXT": "Remove Colors"
                });
            }
        }else{
            outButtons.push({
                "ONCLICK": "Super.Init()",
                "TEXT": "Load Source"
            });
        }

        return outButtons;
    },
    
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
