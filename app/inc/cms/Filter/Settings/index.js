/**
 * Created by WareBare on 3/24/2017.
 */


module.exports = {
    SubPageName: `Settings`,
    Forms: {},
    tplContent: {

    },
    

    Init: function(){},

    OnSubmitForm_GdPath: function(el){
        //Log(el.value);
        appConfig.set(`GrimDawn.Paths.Game`, el.value);
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

    MakeContentForLocaleManagement: function(){
        let outStr = ``
            , tempFormItemOutput = ``;

        //
        tempFormItemOutput = ``;
        tempFormItemOutput += Super.tplContent.CheckBox.wzReplace({
            TEXT: Super.GetGrimDawnPath()
            , ON_CLICK_FN: `_cms.OnSubmitForm_bUseLanguage(this)`
            , LABEL: `Use Localization`
            , B_CHECKED: (Super.IsUsingLocale()) ? ` CHECKED` : ``
            //, SETTINGS: ` style="width: 750px;"`
            //, ERROR_MSG: (Super.IsPathCorrect()) ? `` : `Path must be wrong!`
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
                TEXT: Super.GetGrimDawnPath()
                , ON_CLICK_FN: `_cms.OnSubmitForm_bZipChanges(this)`
                , LABEL: `Zip Changes`
                , B_CHECKED: (appConfig.get(`Filter.bZipChanges`)) ? ` CHECKED` : ``
                //, SETTINGS: ` style="width: 750px;"`
                //, ERROR_MSG: (Super.IsPathCorrect()) ? `` : `Path must be wrong!`
            });
            /*
            tempFormItemOutput += ``;
            tempFormItemOutput += Super.tplContent.CheckBox.wzReplace({
                TEXT: Super.GetGrimDawnPath()
                , ON_CLICK_FN: `_cms.OnSubmitForm_bUseLanguage(this)`
                , LABEL: `Use Localization`
                , B_CHECKED: (Super.IsUsingLocale()) ? ` CHECKED` : ``
                //, SETTINGS: ` style="width: 750px;"`
                //, ERROR_MSG: (Super.IsPathCorrect()) ? `` : `Path must be wrong!`
            });
            */
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
    MakeContentForFilterManagement: function(){
        let outStr = ``
            , tempFormItemOutput = `Coming Soon`;

        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Filter Overview`
            , CONTENTS: `${tempFormItemOutput}`
        });

        return outStr;
    },

    MakeContent_Default: function(){
        let outStr = ``
            , tempFormItemOutput = ``;

        tempFormItemOutput = ``;
        tempFormItemOutput += Super.tplContent.TextField.wzReplace({
            TEXT: Super.GetGrimDawnPath()
            , ON_CHANGE_FN: `_cms.OnSubmitForm_GdPath(this)`
            , LABEL: `Grim Dawn - Path`
            , SETTINGS: ` style="width: 750px;"`
            , ERROR_MSG: (Super.IsPathCorrect()) ? `` : `Path must be wrong!`
        });

        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Settings`
            , CONTENTS: `${tempFormItemOutput}`
        });

        if(Super.IsPathCorrect()){
            outStr += this.MakeContentForLocaleManagement();
            outStr += `<br />`;
            outStr += this.MakeContentForFilterManagement();
        } 

        return outStr;
    },

    PreviouslySelectedAndExistingGroupName: false,
    CurrentlySelectedGroupName: false,
    bGroupKeyIsUnique: true,
    bGroupIsReadOnly: false,

    OnChangeText_FilterGroup_Name: function(el){
        //
        if(el.value !== ``){
            //Super.ManageFilterStorage(`GroupData`, el.value.replace(/\./g, `\\.`), this.CurrentlySelectedGroupName, true);
            this.CurrentlySelectedGroupName = el.value;
        }
        

        //Super.ResetClassData(`GroupData`);
        wzReloadCMS(10);
    },
    OnChangeText_FilterGroup_Text: function(el){
        if(el.value !== ``){
            
            //Super.ResetClassData(`GroupData`);
        }

        wzReloadCMS(10);
    },
    

    OnClick_UpdateKeyFilterGroup: function(InNewKey){
        Super.ManageFilterStorage(`GroupData`, this.CurrentlySelectedGroupName.replace(/\./g, `\\.`), this.PreviouslySelectedAndExistingGroupName.replace(/\./g, `\\.`), true);
    },
    OnClick_CopyFilterGroup: function(){
        //Log(`Prev Group: ${this.PreviouslySelectedAndExistingGroupName}`);
        //Log(`New Group: ${this.CurrentlySelectedGroupName}`);
        Super.ManageFilterStorage(`GroupData`, this.CurrentlySelectedGroupName.replace(/\./g, `\\.`), this.PreviouslySelectedAndExistingGroupName.replace(/\./g, `\\.`), true, false);
    },
    OnClick_DeleteFilterGroup: function(){
        Super.ManageFilterStorage(`GroupData`, this.CurrentlySelectedGroupName.replace(/\./g, `\\.`), this.CurrentlySelectedGroupName.replace(/\./g, `\\.`), true);

        this.CurrentlySelectedGroupName = false;
        this.PreviouslySelectedAndExistingGroupName = false;
    },

    OnChangeSelect_FilterGroup: function(el){
        this.CurrentlySelectedGroupName = el.value;

        wzReloadCMS(10);
    },
    Echo_GroupManagerHeader: function(InGroupData){
        let outStr = `Header`, tempFormItemOutput = ``, groupOptions = [];

        /// DIV BLOCK 01
        // Select List for Group Edit
        for(let groupKey in InGroupData){
            groupOptions.push({
                TEXT: groupKey
                , VALUE: groupKey
                , TOOL_TIP: `Name: ${InGroupData[groupKey].DisplayName}\nDefault Color: ^${InGroupData[groupKey].ColorCode} (${appData[`gd-colorcodes`][InGroupData[groupKey].ColorCode].DisplayName})`
                , B_CHECKED: (this.CurrentlySelectedGroupName === groupKey) ? ` SELECTED` : ``
            });
        }

        tempFormItemOutput += `<div class="Align_H">`;
        tempFormItemOutput += Super.MakeForm_SelectBox({
            LABEL: `Select a Group to Edit`
            , ON_CHANGE_FN: `_cms.OnChangeSelect_FilterGroup(this)`
            , SIZE: 10
        }, groupOptions.sort(function(InTextA, InTextB){
            let textA = InTextA.TEXT.toUpperCase(); // ignore upper and lowercase
            let textB = InTextB.TEXT.toUpperCase(); // ignore upper and lowercase
            if (textA < textB) {
                return -1;
            }
            if (textA > textB) {
                return 1;
            }

            // names must be equal
            return 0;
        }));
        tempFormItemOutput += `</div>`;

        this.bGroupIsReadOnly = false;
        /// DIV BLOCK 02
        tempFormItemOutput += `<div class="Align_H">`;
        if(this.CurrentlySelectedGroupName){
            if(InGroupData[this.CurrentlySelectedGroupName]) {
                this.PreviouslySelectedAndExistingGroupName = this.CurrentlySelectedGroupName;
                this.bGroupIsReadOnly = InGroupData[this.CurrentlySelectedGroupName].bReadOnly || false;
            }else if(InGroupData[this.PreviouslySelectedAndExistingGroupName]){
                this.bGroupIsReadOnly = InGroupData[this.PreviouslySelectedAndExistingGroupName].bReadOnly || false;
            }
            this.bGroupKeyIsUnique = (Super.GetClassData(`GroupData`)[this.CurrentlySelectedGroupName]) ? false : true;

            if(this.bGroupIsReadOnly){
                tempFormItemOutput += `<span class="Msg_Warn">This Group is ReadOnly, you cannot change its settings, but you can make a new one based on it.</span><br />`;
            }
            // BUTTONS
            let htmlButtons01 = [];
            if(this.bGroupKeyIsUnique){
                if(!this.bGroupIsReadOnly){ //  && InGroupData[this.PreviouslySelectedAndExistingGroupName]
                    htmlButtons01.push({
                        "ONCLICK": "_cms.OnClick_UpdateKeyFilterGroup()",
                        "TEXT": "Change Key"
                    });
                }
                htmlButtons01.push({
                    "ONCLICK": "_cms.OnClick_CopyFilterGroup()",
                    "TEXT": "Create Group"
                });
            }else{
                if(!this.bGroupIsReadOnly){
                    htmlButtons01.push({
                        "ONCLICK": "_cms.OnClick_DeleteFilterGroup()",
                        "TEXT": "Delete Group"
                    });
                }
            }

            // Group Name/Key Field.
            tempFormItemOutput += Super.tplContent.TextField.wzReplace({
                TEXT: this.CurrentlySelectedGroupName
                , ON_CHANGE_FN: `_cms.OnChangeText_FilterGroup_Name(this)`
                , LABEL: `Group Key (must be unique)`
                , SETTINGS: ` style="width: 400px;"`
                , ERROR_MSG: (this.bGroupKeyIsUnique) ? `` : `Key Must Be Unqiue!`
            });

            // Group DisplayName Field.
            if(!this.bGroupIsReadOnly && InGroupData[this.CurrentlySelectedGroupName]){
                tempFormItemOutput += Super.tplContent.TextField.wzReplace({
                    TEXT: InGroupData[this.CurrentlySelectedGroupName].DisplayName || `Name Required!`
                    , ON_CHANGE_FN: `_cms.OnChangeText_FilterGroup_Text(this)`
                    , LABEL: `Group Name`
                    , SETTINGS: ` style="width: 300px;"`
                    , ERROR_MSG: ``
                });
            }
            // Button output.
            tempFormItemOutput += `<br />`;
            tempFormItemOutput += appData.tpl.Buttons.Default.wzParseTPL(htmlButtons01);

        }else{
            tempFormItemOutput += `Select a group to edit, you may also create a new group based on your selection, but you must select a group first.`;
        }
        tempFormItemOutput += `</div>`;

        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Overview`
            , CONTENTS: `${tempFormItemOutput}`
        });

        tempFormItemOutput = ``;

        return outStr;
    },

    MakeContent_Groups: function(){
        let outStr = ``
            , GroupsData = Super.GetClassData(`GroupData`);

        outStr += this.Echo_GroupManagerHeader(GroupsData);

        for(let groupKey in GroupsData){

        }
        
        return outStr;
    },

    MakeContent_Basics: function(){
        let Output = `Basic Setup`;

        return Output;
    },

    MakeContent_DEV: function(){
        let Output = `Dev area: YOU SHOULD NOT BE SEEING THIS!`;

        // Display FilterGroups:

        /*
        let DataToChange = appData[`tag-data-affixes`], DataToStore = {}, tempValue, TempConfig = new eConfig({name: `temp-data`});
        Log();

        for(let oldDataKey in DataToChange){
            tempValue = DataToChange[oldDataKey];
            for(let tagIndex in tempValue){

                for(let tagName in tempValue[tagIndex]){

                    DataToStore[tagName] = {
                        Classification: `${tagIndex}`
                        , Type: `Affix`
                        , Group: `${oldDataKey}`
                    }

                }
                
            }

        }
        TempConfig.store = DataToStore;
        */

        return Output;
    },

    content_: function(InContentType){
        this.contentType = InContentType || this.contentType || `Default`;
        
        let Output = ``;
        
        if(this.contentType === `Default`){
            Output += this.MakeContent_Default();
        }else if(this.contentType === `Basics`){
            Output += this.MakeContent_Basics();
        }else if(this.contentType === `Groups`){
            Output += this.MakeContent_Groups();
        }else if(this.contentType === `Dev`){
            Output += this.MakeContent_DEV();
        } else{
            Output += `No Available Content!`;
        }
        
        return Output;
    },
    
    sidebarBtns_: function(){
        let outButtons = [];

        // ---

        return outButtons;
    },
    sidebarList_: function(){
        let AdditionalListButtons = {};

        if(Super.IsPathCorrect()){
            AdditionalListButtons[`Basics`] = {
                text: `Add Tag for Coloring`
            };
        }
        if(Super.IsPathCorrect()){
            AdditionalListButtons[`Groups`] = {
                text: `Manage Coloring Groups`
            };
        }
        if(bDev){
            AdditionalListButtons[`Dev`] = {
                text: `DEV`
            };
        }

        return Object.assign({
            'Default':{
                text: `General`
            }
        }, AdditionalListButtons);
    }
    
};
