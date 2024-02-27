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
        appConfig.set(`GrimDawn.Paths.UserData`, el.value.replace(/\\/g, `/`));
        Super.Init();

        wzReloadCMS(10);
    },

    OnSubmitForm_SteamPathAdd: function (el)
    {
        appConfig.set(`Paths.SteamDirectory`, el.value.replace(/\\/g, `/`));
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

    OnSubmitForm_bForceGrimDawn64: function (el)
    {
        appConfig.set(`Launcher.bForceGrimDawn64`, el.checked);

        wzReloadCMS(10);
    },
    OnSubmitForm_bMinimizeToTray: function (el)
    {
        appConfig.set(`ProgramOptions.bMinimizeToTray`, el.checked);

        wzReloadCMS(10);
    },
    OnSubmitForm_bCloseToTray: function (el)
    {
        appConfig.set(`ProgramOptions.bCloseToTray`, el.checked);

        wzReloadCMS(10);
    },

    MakeContent_Localization: function(){
        let outStr = ``
            , activeLanguage = appConfig.get(`RadioGroupStorage.Language`)
            , tempFormItemOutput = ``;

        tempFormItemOutput = `<div>Changing the Language will force the program to reload.</div><div>If you have an error message at the top telling you about using internal files, you can only generate files for English.</div>`;
        tempFormItemOutput += Super.MakeRadioGroup({
            ElementName: `Language`
            , GroupText: `Choose Filter Language`
            , bForceReload: true
            , DefaultValue: activeLanguage
        }, [
            {
                Value: `en`
                , Text: `English`
            } , {
                Value: `es`
                , Text: `Spanish`
            } , {
                Value: `fr`
                , Text: `French`
            } , {
                Value: `de`
                , Text: `German`
            } , {
                Value: `it`
                , Text: `Italian`
            } , {
                Value: `cs`
                , Text: `Czech`
            } , {
                Value: `ja`
                , Text: `Japanese`
            } , {
                Value: `ko`
                , Text: `Korean`
            } , {
                Value: `pl`
                , Text: `Polish`
            } , {
                Value: `pt`
                , Text: `Portuguese`
            } , {
                Value: `ru`
                , Text: `Russian`
            } , {
                Value: `vi`
                , Text: `Vietnamese`
            } , {
                Value: `zh`
                , Text: `Chinese`
            }
        ]);

        /*
        tempFormItemOutput = ``;
        tempFormItemOutput += Super.tplContent.CheckBoxWithTip.wzReplace({
            TEXT: Super.GetGrimDawnPath()
            , ON_CLICK_FN: `_cms.OnSubmitForm_bUseLanguage(this)`
            , LABEL: `Use Localization`
            , TOOL_TIP: `<ul><li>This is only required when using a different language for Grim Dawn.</li></ul>`
            , B_CHECKED: (Super.IsUsingLocale()) ? ` CHECKED` : ``
        });

        if(Super.IsUsingLocale()){

            let localeContents = fs.readdirSync(`${Super.Paths.Locale}`);
            let localeZips = [];
            let localeDefs;
            let localeOptions = [];


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
        */

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
        if(typeof appConfig.get(`Filter.bEnableClassNames`) === `undefined`) appConfig.set(`Filter.bEnableClassNames`, false);
        
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
            , TOOL_TIP: `<ul><li class="Msg_Warn">${(appConfig.get(`Filter.bMakeZipForTextEn`)) ? `Creates Zip in addition to regular files.` : `Will not create Zip.`}</li></ul>`
            });
            
            tempFormItemOutput += Super.tplContent.CheckBoxWithTip.wzReplace({
                ON_CLICK_FN: `_cms.OnClickCheckBox_bEnableAutoDelete(this)`
                , LABEL: `Auto-Delete Old Files`
                , B_CHECKED: (appConfig.get(`Filter.bEnableAutoDelete`)) ? ` CHECKED` : ``
            , TOOL_TIP: `<ul><li class="Msg_Warn">Current selection will ${(appConfig.get(`Filter.bEnableAutoDelete`)) ? `delete tag files before creating new ones.` : `overwrite any existing Rainbow File. (Note: unchanged files may cause issues)`}</li><li>This is needed when color presets do not require the same files to be edited.</li><li>You can manually delete files with the button on the right-hand side <kbd>Remove Colors</kbd>.</li><li class="Msg_Warn">Deletes all files in /settings/text_en/ when you use <kbd>Save Colors</kbd>.<ul><li>if Rainbow Files are the only files, you have nothing to worry about.</li></ul></li></ul>`
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
    OnClickBtn_FindPaths: function(){
        wzUpdateHeader(`Trying to find installation paths, this may take a moment.`);

        const steamExe = `steam.exe`;
        //const gameExe = `Clicker Heroes.exe`;
        const gameExe = `Grim Dawn.exe`;
        //const gameExe = `ArchiveTool.exe`;
        const commonDirectories_Steam = [
            "C:/Program Files (x86a)/Steam"
            , "C:/Program Files/Steam"
            , "D:/Program Files (x86)/Steam"
            , "D:/Program Files/Steam"
        ];
        const commonDirectories_GOG = [
            "C:/Program Files"
            , "C:/Program Files (x86)"
            , "D:/Program Files"
            , "D:/Program Files (x86)"
        ];
        const registrySteam = `HKEY_CURRENT_USER\\Software\\Valve\\Steam`;
        const steamLibFoldersFile = `libraryfolders.vdf`;
        const steamGameSubDir = `steamapps\\common`;

        let b64BitSystem = true;

        setTimeout( () => {
            // Check common directories for steam.
            let dirSteam = Super.FindPathToFile(steamExe, commonDirectories_Steam);
            let dirGame = false;

            // Nothing found in common directories, check regestry for installation folder.
            if (dirSteam === false)
            {
                dirSteam = Super.GetValueFromRegistry(registrySteam, `SteamPath`) || false;
            }

            // Steam was found, check for Grim Dawn inside the same directory
            if (dirSteam)
            {
                // Check steam path for (x86), this means it is likely a 64-bit system.
                b64BitSystem = dirSteam.includes(`(x86)`);

                dirGame = Super.FindPathToFile(gameExe, [`${dirSteam}\\${steamGameSubDir}`]);

                // Grim Dawn could not be found, check `libraryfolders.vdf` for alternate steam libraries.
                if (dirGame === false)
                {
                    try
                    {
                        let steamLibData = fs.readFileSync(`${dirSteam}\\steamapps\\${steamLibFoldersFile}`).toString();
                        const splitSteamLibData = steamLibData.replace(/\r?\n/g).split(`"`);

                        for (let steamLibDataIndex = 0; steamLibDataIndex < splitSteamLibData.length; steamLibDataIndex++) {
                            const element = splitSteamLibData[steamLibDataIndex];
                            
                            if (element.includes(`:\\\\`) === false) continue;

                            dirGame = Super.FindPathToFile(gameExe, [`${element.replace(`\\\\`, `\\`)}\\${steamGameSubDir}`]);

                            // Grim Dawn found in one of the alternate steam libraries.
                            if (dirGame) break;
                        }
                    }
                    catch (err)
                    {
                        console.error(err);
                    }
                    
                }
            }

            // Steam was not found, check for Grim Dawn in common directories (for GOG).
            if (dirGame === false)
            {
                dirGame = Super.FindPathToFile(gameExe, commonDirectories_GOG);
            }

            // Set settings.
            if (dirGame)
            {
                console.log(`Grim Dawn Path: ${dirGame}`);
                appConfig.set(`GrimDawn.Paths.Game`, dirGame.replace(/\\/g, `/`));

                if (fs.existsSync(`${dirGame}\\localization`))
                {
                    const localeFiles = fs.readdirSync(`${dirGame}\\localization`);

                    if (typeof localeFiles[0] !== `undefined`)
                    {
                        appConfig.set(`Filter.bUseLocale`, true);
                    }
                }

                if (fs.existsSync(`${dirGame}\\gdx2`))
                {
                    appConfig.set(`RadioGroupStorage.GrimDawnXPacOptions`, `gdx2`);
                }
                else if (fs.existsSync(`${dirGame}\\gdx1`))
                {
                    appConfig.set(`RadioGroupStorage.GrimDawnXPacOptions`, `gdx1`);
                }
                else
                {
                    appConfig.set(`RadioGroupStorage.GrimDawnXPacOptions`, `gdx0`);
                }
                
            }
            if (dirSteam)
            {
                console.log(`Steam Path: ${dirSteam}`);
                appConfig.set(`Paths.SteamDirectory`, dirSteam.replace(/\\/g, `/`));
            }

            if (b64BitSystem)
            {
                appConfig.set(`RadioGroupStorage.GrimDawnSystemType`, `x64`);
            }
            else
            {
                appConfig.set(`RadioGroupStorage.GrimDawnSystemType`, `x86`);
            }
            

            setTimeout(() => {
                wzUpdateHeader(`Finished process of finding paths, an empty field means a path could not be found. You will have to enter one yourself.`);
            }, 100);
            
            Super.Init();
            wzReloadCMS(10);
        }, 100 );
        
    },

    MakeContent_Default: function(){
        let outStr = ``
        let bPathCorrect = Super.IsPathCorrect()
        let coreOptionsOutput = ``;
        let tempFormItemOutput = ``;
            
        let actionBtnMap = new TButton();

        tempFormItemOutput = ``;

        actionBtnMap.Add(`FindPaths`, {
            Text: `Predict Settings`
            , Tip: `<ul><li>Gets several settings by checking C: and D: for Grim Dawn and Steam.</li><li><i><b>Note:</b></i> <span class="Msg_Warn">This may take a moment</span> and old settings will be overwritten.</li><li><i><b>Note:</b></i> Steam is fully supported, <span class="Msg_Warn">GOG may still have some issues</span>.</li></ul>`
        });
        if(bPathCorrect) {
            actionBtnMap.Add(`OpenInExplorer`, {
                Text: `Open in Explorer`
                , Tip: `<ul><li>Opens Grim Dawn Directory in Explorer.</li></ul>`
            });
            //tempFormItemOutput += `<span class="formBTN" onclick="require('electron').shell.openExternal('${Super.GetGrimDawnPath()}')">Open in Explorer</span><br />`;
        }

        coreOptionsOutput += actionBtnMap.MakeOutput();
        tempFormItemOutput += `<br />`;

        tempFormItemOutput += Super.tplContent.TextFieldWithTip.wzReplace({
            TEXT: Super.GetGrimDawnPath() || ``
            , ON_CHANGE_FN: `_cms.OnSubmitForm_GdPath(this)`
            , LABEL: `Grim Dawn Directory - Path`
            , SETTINGS: ` style="width: 650px;"`
            , TOOL_TIP: `<ul><li>Required</li><li>Primary save location for created files.</li><li>Uses ArchiveTool.exe (from Crate Ent.) to extract the required text files.</li><li>Example: C:/Program Files (x86)/Steam/steamapps/common/Grim Dawn</li></ul>`
            , ERROR_MSG: (bPathCorrect) ? `` : ( (Super.GetGrimDawnPath() === false) ? `Enter a path (or use "Predict Settings")` : `Path must be wrong!` )
        });



        let additionalOptionsOutput = ``;
        if(bPathCorrect){
            if(!Super.IsUsingLocale()){
                tempFormItemOutput += Super.tplContent.TextFieldWithTip.wzReplace({
                    TEXT: appConfig.get(`GrimDawn.Paths.UserData`) || ``
                    , ON_CHANGE_FN: `_cms.OnSubmitForm_GdPathAdd(this)`
                    , LABEL: `Grim Dawn - User Data Path [optional]`
                    , SETTINGS: ` style="width: 650px;"`
                    , TOOL_TIP: `<ul><li>Optional</li><li>This can be used if you are experiencing tag issues</li><li>Example: C:/Users/Ware/Documents/My Games/Grim Dawn</li></ul>`
                    , ERROR_MSG: ``
                });
            }
            tempFormItemOutput += `<br />`;

            tempFormItemOutput += Super.tplContent.TextFieldWithTip.wzReplace({
                TEXT: appConfig.get(`Paths.SteamDirectory`) || ``
                , ON_CHANGE_FN: `_cms.OnSubmitForm_SteamPathAdd(this)`
                , LABEL: `Steam Directory [optional]`
                , SETTINGS: ` style="width: 650px;"`
                , TOOL_TIP: `<ul><li>Optional</li><li>Used only for running non-GI Grim Dawn with Launch Options. (like /x64)</li><li>Example: C:/Program Files (x86)/Steam</li></ul>`
                , ERROR_MSG: (fs.existsSync(`${appConfig.get(`Paths.SteamDirectory`)}`)) ? `` : `Path must be wrong!`
            });

            /// Tool Options
            let additionalFormItemsOutput = ``;

            if (typeof appConfig.get(`ProgramOptions.bMinimizeToTray`) === `undefined`) 
            {
                appConfig.set(`ProgramOptions.bMinimizeToTray`, false);
            }
            additionalFormItemsOutput += Super.tplContent.CheckBoxWithTip.wzReplace({
                TEXT: Super.GetGrimDawnPath()
                , ON_CLICK_FN: `_cms.OnSubmitForm_bMinimizeToTray(this)`
                , LABEL: `Minimize to tray`
                , TOOL_TIP: `<ul><li>Rainbow Tool will be minimized to System-Tray when minimized (rather than to the taskbar).</li><li>Click the icon in the System-Tray to open Rainbow Tool again.</li><li>Right-Click the icon in the System-Tray brings up a context-menu.</li></ul>`
                , B_CHECKED: (appConfig.get(`ProgramOptions.bMinimizeToTray`)) ? ` CHECKED` : ``
            });
    
            if (typeof appConfig.get(`ProgramOptions.bCloseToTray`) === `undefined`) 
            {
                appConfig.set(`ProgramOptions.bCloseToTray`, true);
            }
            additionalFormItemsOutput += Super.tplContent.CheckBoxWithTip.wzReplace({
                TEXT: Super.GetGrimDawnPath()
                , ON_CLICK_FN: `_cms.OnSubmitForm_bCloseToTray(this)`
                , LABEL: `Close to tray`
                , TOOL_TIP: `<ul><li>Rainbow Tool will be minimized to System-Tray when closed (rather than closing Rainbow Tool entirely).</li><li>Click the icon in the System-Tray to open Rainbow Tool again.</li><li>Right-Click the icon in the System-Tray brings up a context-menu.</li></ul>`
                , B_CHECKED: (appConfig.get(`ProgramOptions.bCloseToTray`)) ? ` CHECKED` : ``
            });
            
            additionalOptionsOutput += Super.tplContent.CollapsibleContainer.wzReplace({
                TITLE: `Advanced Rainbow Tool Settings`
                , CONTENTS: `${additionalFormItemsOutput}`
                , B_OPEN: ``
            });

            /// Launch Options
            additionalFormItemsOutput = ``;

            
            let gdXpacOptions = [
                {
                    Value: `gdx0`
                    , Text: `Vanilla`
                }
            ];
            let defaulGdXpacOption = `gdx0`;
            if (fs.existsSync(`${Super.GetGrimDawnPath()}\\gdx1`))
            {
                gdXpacOptions.push({
                    Value: `gdx1`
                    , Text: `Ashes of Malmouth`
                    //, ToolTip: `Load XPac with 2`
                });
                defaulGdXpacOption = `gdx1`;
            }
            if (fs.existsSync(`${Super.GetGrimDawnPath()}\\gdx2`))
            {
                gdXpacOptions.push({
                    Value: `gdx2`
                    , Text: `Forgotten Gods`
                });
                defaulGdXpacOption = `gdx2`;
            }

            // Check if a new Xpac was installed.
            /*
            const bGdXpacOptionDefined = typeof appConfig.get(`RadioGroupStorage.GrimDawnXPacOptions`) !== `undefined`;
            const bGdXpacOptionsDiffer = defaulGdXpacOption !== appConfig.get(`RadioGroupStorage.GrimDawnXPacOptions`);
            if (bGdXpacOptionDefined && bGdXpacOptionsDiffer)
            {
                appConfig.set(`RadioGroupStorage.GrimDawnXPacOptions`, defaulGdXpacOption);
            }
            */
            
            additionalFormItemsOutput += Super.MakeRadioGroup({
                ElementName: `GrimDawnXPacOptions`
                , GroupText: `Expansion`
                , bUseListBox: true
                , DefaultValue: defaulGdXpacOption
            }, gdXpacOptions);
            additionalFormItemsOutput += `<br />`;

            additionalFormItemsOutput += Super.MakeRadioGroup({
                ElementName: `GrimDawnSystemType`
                , GroupText: `System Type`
                , bUseListBox: true
                , DefaultValue: `x86`
            }, [
                {
                    Value: `x86`
                    , Text: `32-bit (x86)`
                } , {
                    Value: `x64`
                    , Text: `64-bit (x64)`
                    , ToolTip: `Load XPac with 2`
                }
            ]);
            additionalFormItemsOutput += Super.MakeRadioGroup({
                ElementName: `GrimDawnDirectX`
                , GroupText: `DirectX Version`
                , bUseListBox: true
                , DefaultValue: `dx11`
            }, [
                {
                    Value: `dx09`
                    , Text: `DirectX 9`
                } , {
                    Value: `dx11`
                    , Text: `DirectX 11`
                }
            ]);
            additionalFormItemsOutput += `<br />`;

            /*
            additionalFormItemsOutput += `<br />`;
            additionalFormItemsOutput += Super.tplContent.CheckBoxWithTip.wzReplace({
                ON_CLICK_FN: `_cms.OnSubmitForm_bForceGrimDawn64(this)`
                , LABEL: `Force x64 Grim Dawn Launch`
                , TOOL_TIP: `<ul><li>This is not required when your "Steam Launch Option" is set to /x64</li><li>Not needed for launching GI.</li><li>Note: I only have steam to test - GoG might not work.</li></ul>`
                , B_CHECKED: (appConfig.get(`Launcher.bForceGrimDawn64`)) ? ` CHECKED` : ``
            });
            */

            additionalOptionsOutput += Super.tplContent.CollapsibleContainer.wzReplace({
                TITLE: `Grim Dawn - Launch Settings`
                , CONTENTS: `${additionalFormItemsOutput}`
                , B_OPEN: ``
            });
        }

        coreOptionsOutput += Super.tplContent.CollapsibleContainer.wzReplace({
            TITLE: `Rainbow Tool Settings`
            , CONTENTS: `${tempFormItemOutput}`
            , B_OPEN: ` open`
        });

        if(!bPathCorrect) outStr += `<span class="Msg_Warn">Make sure the game is closed (Grim Dawn). You must restart anyways for the tags to be taken in effect.</span>`;
        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Settings`
            , CONTENTS: `${coreOptionsOutput}${additionalOptionsOutput}`
        });

        if (bPathCorrect)
        {
            outStr += `<br />`;
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
    
    sidebarBtns_: function(){
        let outButtons = Super.sidebarBtns_();

        // ---

        return outButtons;
    },
    sidebarList_: function(){
        let outButtons = {};

        // ---

        return outButtons;
    }
    
};
