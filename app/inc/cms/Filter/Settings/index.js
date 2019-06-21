/**
 * Created by WareBare on 3/24/2017.
 */


const $ = require(`./../../../../lib/WanezProjects`);
const { TMap, TButton } = require(`./../../../../lib/WanezProjects/Classes`);

module.exports = {
    SubPageName: `Settings`,
    Forms: {},
    tplContent: {

    },
    

    Init: function(){},

    OnSubmitForm_GdPath: function(el){
        //Log(el.value);
        appConfig.set(`GrimDawn.Paths.Game`, el.value.replace(/\\/g, `/`));

        /*
        setTimeout(function(){
            Super.Init();
            wzReloadCMS(10);
        }, 100);
        */

        Super.Init();

        wzReloadCMS(10);
    },
    OnSubmitForm_GdPathAdd: function(el){
        appConfig.set(`GrimDawn.Paths.UserData`, el.value);
        Super.Init();

        wzReloadCMS(10);
    },

    OnSubmitForm_bUseLanguage: function(el){
        appConfig.set(`Filter.bUseLocale`, el.checked);

        Super.InitData();

        wzReloadCMS(10);
    },

    OnSubmitForm_bZipChanges: function(el){
        appConfig.set(`Filter.bZipChanges`, el.checked);

        //Super.InitData();

        wzReloadCMS(10);
    },

    OnSubmitForm_SelectLanguage: function(el){
        //Log(el.value);
        appConfig.set(`Filter.LocaleFileName`, el.value);

        Super.InitData();

        wzReloadCMS(10);
    },

    OnSubmitForm_bEnableSymbols: function(el){
        appConfig.set(`Filter.bEnableSymbols`, el.checked);

        wzReloadCMS(10);
    },

    OnClickCheckBox_bMakeZipForTextEn: function(el){
        appConfig.set(`Filter.bMakeZipForTextEn`, el.checked);

        wzReloadCMS(10);
    },

    OnClickCheckBox_bEnableAutoDelete: function(el){
        appConfig.set(`Filter.bEnableAutoDelete`, el.checked);

        wzReloadCMS(10);
    },

    MakeContent_Localization: function(){
        let outStr = ``
            , tempFormItemOutput = ``;

        //
        tempFormItemOutput = ``;
        tempFormItemOutput += Super.tplContent.CheckBox.wzReplace({
            TEXT: Super.GetGrimDawnPath()
            , ON_CLICK_FN: `_cms.OnSubmitForm_bUseLanguage(this)`
            , LABEL: `Use Localization`
            , B_CHECKED: (Super.IsUsingLocale()) ? ` CHECKED` : ``
        });

        if(Super.IsUsingLocale()){

            let localeContents = fs.readdirSync(`${Super.Paths.Locale}`)
                , localeZips = []
                , localeDefs
                , localeOptions = [];


            for(let localeIndex in localeContents){
                if(localeContents[localeIndex].endsWith(`.zip`) && !localeContents[localeIndex].endsWith(`_C_.zip`)){
                    localeZips.push(localeContents[localeIndex]);
                }
            }
            localeDefs = Super.MakeLocaleDefs(localeZips);
            //Log(localeDefs);
            for(let defIndex in localeDefs){
                localeOptions.push({
                    TEXT: localeDefs[defIndex].Language || localeDefs[defIndex].language
                    , VALUE: localeDefs[defIndex].ZipName
                    , TOOL_TIP: `Authors: ${localeDefs[defIndex].author || localeDefs[defIndex].Author}\nFilename: ${localeDefs[defIndex].ZipName}`
                    , B_CHECKED: (appConfig.get(`Filter.LocaleFileName`) === localeDefs[defIndex].ZipName) ? ` SELECTED` : ``
                });
            }
            //localeOptions = 
            if(localeOptions.length){
                tempFormItemOutput += Super.MakeForm_SelectBox({
                    LABEL: `Choose Language`
                    , ON_CHANGE_FN: `_cms.OnSubmitForm_SelectLanguage(this)`
                }, localeOptions);
            }else{
                tempFormItemOutput += `<div>Loading Localizations...</div>`;
            }

            if(typeof appConfig.get(`Filter.bZipChanges`) === `undefined`) appConfig.set(`Filter.bZipChanges`, true);

            tempFormItemOutput += ``;
            tempFormItemOutput += Super.tplContent.CheckBox.wzReplace({
                ON_CLICK_FN: `_cms.OnSubmitForm_bZipChanges(this)`
                , LABEL: `Zip Changes`
                , B_CHECKED: (appConfig.get(`Filter.bZipChanges`)) ? ` CHECKED` : ``
            });
        }

        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Language`
            , CONTENTS: `${tempFormItemOutput}`
        });

        return outStr;
    },

    /**
     * ex New Filter, Delete Filter, Rename Filter, ...
     */
    MakeContent_FilterOverview: function(){
        let outStr = ``
            , tempFormItemOutput = ``;

        if(typeof appConfig.get(`Filter.bEnableSymbols`) === `undefined`) appConfig.set(`Filter.bEnableSymbols`, true);
        if(typeof appConfig.get(`Filter.bMakeZipForTextEn`) === `undefined`) appConfig.set(`Filter.bMakeZipForTextEn`, false);
        if(typeof appConfig.get(`Filter.bEnableAutoDelete`) === `undefined`) appConfig.set(`Filter.bEnableAutoDelete`, false);
        
        tempFormItemOutput += ``;
        tempFormItemOutput += Super.tplContent.CheckBoxWithTip.wzReplace({
            ON_CLICK_FN: `_cms.OnSubmitForm_bEnableSymbols(this)`
            , LABEL: `Enable Symbols`
            , B_CHECKED: (appConfig.get(`Filter.bEnableSymbols`)) ? ` CHECKED` : ``
            , TOOL_TIP: `<ul><li class="Msg_Warn">${(appConfig.get(`Filter.bEnableSymbols`)) ? `Add Symbols.` : `Not adding Symbols.`}</li><li>Symbols are used for sets and show as (S).</li></ul>`
        });
        
        if(!Super.IsUsingLocale()){
            tempFormItemOutput += Super.tplContent.CheckBoxWithTip.wzReplace({
                ON_CLICK_FN: `_cms.OnClickCheckBox_bMakeZipForTextEn(this)`
                , LABEL: `Create Zip`
                , B_CHECKED: (appConfig.get(`Filter.bMakeZipForTextEn`)) ? ` CHECKED` : ``
            , TOOL_TIP: `<ul><li class="Msg_Warn">${(appConfig.get(`Filter.bMakeZipForTextEn`)) ? `Creates Zip in addition to regular files.` : `Will not create Zip.`}</li><li>Creates a Zip for non-localized colors.</li><li class="Msg_Warn">Localizations have their own checkbox.</li></ul>`
            });
            
            tempFormItemOutput += Super.tplContent.CheckBoxWithTip.wzReplace({
                ON_CLICK_FN: `_cms.OnClickCheckBox_bEnableAutoDelete(this)`
                , LABEL: `Auto-Delete Old Files`
                , B_CHECKED: (appConfig.get(`Filter.bEnableAutoDelete`)) ? ` CHECKED` : ``
            , TOOL_TIP: `<ul><li class="Msg_Warn">${(appConfig.get(`Filter.bEnableAutoDelete`)) ? `Deletes filter files before creating new ones.` : `Overwrites old files.`}</li><li>This is needed when color presets do not require the same files to be edited.</li><li>You can manually delete files with the button on the right-hand side <kbd class="DefaultBtn">Delete Old Files</kbd>.</li><li class="Msg_Warn">Deletes all files in /settings/text_en/ when you use <kbd class="DefaultBtn">Save Colors</kbd>.<ul><li>if coloring files are the only files, you have nothing to worry about.</li></ul></li></ul>`
            });
        }
        
        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Filter Overview`
            , CONTENTS: `${tempFormItemOutput}`
        });

        return outStr;
    },

    

    TagsAreaContents: ``,
    ParseTagsArea: function(InContents){
        if(InContents === ``) return false;

        InContents = InContents.replace(/(<|>|"|'|`|;|\r)/g, ``);
        let contentSplitByReturn = InContents.split(`\n`)
            , loopSplit
            , bError = false
            , tagData = {};

        for(let i = 0; i < contentSplitByReturn.length; i++){
            // contentSplitByReturn[i]
            loopSplit = contentSplitByReturn[i].split(`,`);
            if(loopSplit.length >= 3 && loopSplit.length <= 4 && bError === false){
                tagData[loopSplit[0].trim()] = {
                    Type: loopSplit[1].trim()
                    , Classification: loopSplit[2].trim()
                    , Group: (loopSplit[3]) ? loopSplit[3].trim() : `None`
                }
            }else{
                bError = true;
            }
        }

        if(bError) {
            wzNotify.err(`Data was invalid, please make sure it is the proper format.`, `Invalid Data!`);
        }else{
            Super.SaveParsedTagData(tagData);
            wzNotify.save(`Data was saved successfully!`, `Data Saved!`);
        }

        return bError;

        //Log(contentSplitByReturn);
    },
    /*
    OnClickTagsArea_AppendToUserData: function(el){
        let bError = this.ParseTagsArea(this.TagsAreaContents);
    },
    OnClickTagsArea_LoadFromUserDataToClipboard: function(el){
        clipboard.writeText(Super.FetchParsedTagData());
    },
    OnClickTagsArea_SaveToUserDataFromClipboard: function(el){
        let bError = this.ParseTagsArea(clipboard.readText());

    },
    */
    OnChangeArea_CheckTags: function(el){
        this.TagsAreaContents = el.value;
    },

    OnClickBtn_SaveAddedTags: function(){
        let bError = this.ParseTagsArea(this.TagsAreaContents);
    },
    OnClickBtn_ExportAddedTags: function(){
        clipboard.writeText(Super.FetchParsedTagData());
    },
    OnClickBtn_ImportAddedTags: function(){
        let bError = this.ParseTagsArea(clipboard.readText());
    },

    MakeContent_AddTags: function(){
        let outStr = ``
            , tempFormItemOutput = ``;
            
        let actionBtnMap = new TButton();

        tempFormItemOutput += `<details class="DefaultDetails"><summary>Information</summary>`;
        tempFormItemOutput += `<p class="Msg_Warn">Existing personal tags will be overriden! Existing data is merged with imported data.</p>`;
        tempFormItemOutput += `<p>${marked(
            `* Missing native item tags can be added from here or in <kbd>Manage Tags</kbd>.\r\n` +
            `* You should use Tag-Adder for bulk adding from text source (such as a forum post).\r\n` +
            `* You should use <kbd>Manage Tags</kbd> for manually adding individual items, because the search/filter function and comboboxes make it easier.\r\n` +
            `* Tag-Adder is using CSV format.\r\n` +
            `* You may use a Text Area and either type in item tag data or paste it.\r\n` +
            `* You may use the clipboard to import/export item tag data.`
        )}</p>`;
        tempFormItemOutput += `</details>`;

        
        tempFormItemOutput += `<details class="DefaultDetails"><summary>Import/Export using Text Area.</summary>`;
        tempFormItemOutput += Super.tplContent.TextAreaWithTip.wzReplace({
            VALUE: this.TagsAreaContents
            , ON_CHANGE_FN: `_cms.OnChangeArea_CheckTags(this)`
            , LABEL: `Text Area`
            , PLACEHOLDER: `tagName,Type,Classification,Group\ntagGDX1_NPC_S_H,MI Item,Legendary,Set\ntagGDX2EndlessDungeon_S202,Regular Item,Legendary`
            , TOOL_TIP: `Formatting is in CSV<br />New tags a seperated by a new line<br />tagName,Type,Classification,Group`
            //, SETTINGS: ` style="width: 650px;"`
            //, ERROR_MSG: (Super.IsPathCorrect()) ? `` : `Path must be wrong!`
        });
        //tempFormItemOutput += `<br />`;

        actionBtnMap.Add(`SaveAddedTags`, {
            Text: `Save`
            , Tip: `<ul><li>Saves Text Area contents to personal Tags (if formatted properly).</li></ul>`
            , TipPos: `right`
        });

        /*
        tempFormItemOutput += `<span class="formBTN" onclick="_cms.OnClickTagsArea_AppendToUserData(this);" data-wztip='Saves Text Area contents to personal Tags (if formatted properly)' data-wztip-position="right">Save</span><br />`;
        tempFormItemOutput += `<span class="formBTN" onclick="_cms.OnClickTagsArea_LoadFromUserDataToClipboard(this);" data-wztip='Writes all personal Tags to the clipboard' data-wztip-position="right">Export to Clipboard</span><br />`;
        tempFormItemOutput += `<span class="formBTN" onclick="_cms.OnClickTagsArea_SaveToUserDataFromClipboard(this);" data-wztip='Saves the clipboard to personal Tags (if formatted properly)' data-wztip-position="right">Import from Clipboard</span><br />`;
        */
       
        tempFormItemOutput += `<br />`;
        tempFormItemOutput += actionBtnMap.MakeOutput();
        tempFormItemOutput += `</details>`;
        

        actionBtnMap = new TButton();
        actionBtnMap.Add(`ExportAddedTags`, {
            Text: `Export to Clipboard`
            , Tip: `<ul><li>Writes all personal Tags to the clipboard.</li></ul>`
            , TipPos: `top`
        });
        actionBtnMap.Add(`ImportAddedTags`, {
            Text: `Import from Clipboard`
            , Tip: `<ul><li>Saves the clipboard to personal Tags (if formatted properly).</li></ul>`
            , TipPos: `top`
        });
        tempFormItemOutput += `<details class="DefaultDetails"><summary>Import/Export using Clipboard.</summary>`;
        tempFormItemOutput += actionBtnMap.MakeOutput();
        tempFormItemOutput += `</details>`;

        // Finalize FORM
        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Tag-Adder`
            , CONTENTS: `${tempFormItemOutput}`
        });

        return outStr;
    },

    OnClickBtn_OpenInExplorer: function(){
        require('electron').shell.openExternal(`${Super.GetGrimDawnPath()}`);
    },

    MakeContent_Default: function(){
        let outStr = ``
            , bPathCorrect = Super.IsPathCorrect()
            , tempFormItemOutput = ``;
            
        let actionBtnMap = new TButton();

        tempFormItemOutput = ``;

        if(bPathCorrect) {
            actionBtnMap.Add(`OpenInExplorer`, {
                Text: `Open in Explorer`
                , Tip: `<ul><li>Opens Grim Dawn - Path in Explorer.</li></ul>`
            });
            //tempFormItemOutput += `<span class="formBTN" onclick="require('electron').shell.openExternal('${Super.GetGrimDawnPath()}')">Open in Explorer</span><br />`;
        }

        tempFormItemOutput += actionBtnMap.MakeOutput();
        tempFormItemOutput += `<br />`;

        tempFormItemOutput += Super.tplContent.TextField.wzReplace({
            TEXT: Super.GetGrimDawnPath()
            , ON_CHANGE_FN: `_cms.OnSubmitForm_GdPath(this)`
            , LABEL: `Grim Dawn - Path`
            , SETTINGS: ` style="width: 650px;"`
            , ERROR_MSG: (bPathCorrect) ? `` : `Path must be wrong!`
        });
        if(bPathCorrect && !Super.IsUsingLocale()){
            tempFormItemOutput += Super.tplContent.TextFieldWithTip.wzReplace({
                TEXT: appConfig.get(`GrimDawn.Paths.UserData`) || ``
                , ON_CHANGE_FN: `_cms.OnSubmitForm_GdPathAdd(this)`
                , LABEL: `Grim Dawn - User Data Path [optional]`
                , SETTINGS: ` style="width: 650px;"`
                , TOOL_TIP: `<ul><li>Optional</li><li>Localizations are not affected by this.</li><li>This can be used if you are experiencing tag issues</li><li>Example: C:/Users/Ware/Documents/My Games/Grim Dawn</li></ul>`
                , ERROR_MSG: ``
            });
        }

        if(!bPathCorrect) outStr += `<span class="Msg_Warn">Make sure the game is closed (Grim Dawn). You must restart anyways for the tags to be in effect. You might as well close it before hand.</span>`;
        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Settings`
            , CONTENTS: `${tempFormItemOutput}`
        });

        if(bPathCorrect){
            outStr += this.MakeContent_Localization();
            outStr += `<br />`;
            outStr += this.MakeContent_FilterOverview();
            outStr += `<br />`;
            outStr += this.MakeContent_AddTags();
        } 

        return outStr;
    },

    content_: function(InContentType){
        this.contentType = InContentType || this.contentType || `Default`;
        
        let Output = ``;
        
        Output += this.MakeContent_Default();
        
        return Output;
    },

    OnClickSidebarBtn_DeleteOldColorFiles: function(){
        Super.OnDeleteOldFiles();
    },
    
    sidebarBtns_: function(){
        let outButtons = [];

        // ---
        if(Super.IsPathCorrect()){
            if(!Super.IsUsingLocale()){
                /// Path is correct and using Locale
                outButtons.push({
                    "ONCLICK": "_cms.OnClickSidebarBtn_DeleteOldColorFiles()",
                    "TEXT": "Delete Old Files"
                });
            }
        }
        

        return outButtons;
    },
    sidebarList_: function(){
        let outButtons = {};

        // ---

        return outButtons;
    }
    
};
