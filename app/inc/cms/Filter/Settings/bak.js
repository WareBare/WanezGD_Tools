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
                ON_CLICK_FN: `_cms.OnSubmitForm_bZipChanges(this)`
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
            , tempFormItemOutput = ``;

        if(typeof appConfig.get(`Filter.bEnableSymbols`) === `undefined`) appConfig.set(`Filter.bEnableSymbols`, true);
        
        tempFormItemOutput += `Symbols are things like (S) for set items. Uncheck "Enable Symbols" if you don't want those.<br />`;
        tempFormItemOutput += Super.tplContent.CheckBox.wzReplace({
            ON_CLICK_FN: `_cms.OnSubmitForm_bEnableSymbols(this)`
            , LABEL: `Enable Symbols`
            , B_CHECKED: (appConfig.get(`Filter.bEnableSymbols`)) ? ` CHECKED` : ``
            //, SETTINGS: ` style="width: 750px;"`
            //, ERROR_MSG: (Super.IsPathCorrect()) ? `` : `Path must be wrong!`
        });

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
        if(Super.IsPathCorrect() && !Super.IsUsingLocale()){
            tempFormItemOutput += Super.tplContent.TextFieldWithTip.wzReplace({
                TEXT: appConfig.get(`GrimDawn.Paths.UserData`) || ``
                , ON_CHANGE_FN: `_cms.OnSubmitForm_GdPathAdd(this)`
                , LABEL: `Grim Dawn - User Data Path [optional]`
                , SETTINGS: ` style="width: 750px;"`
                , TOOL_TIP: `<ul><li>Optional</li><li>Localizations are not affected by this.</li><li>This can be used if you are experiencing tag issues</li><li>Example: C:/Users/Ware/Documents/My Games/Grim Dawn</li></ul>`
                , ERROR_MSG: ``
            });
        }

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

    // PROPERTIES - Groups
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
            Super.ManageFilterStorage(`GroupData`, `${this.CurrentlySelectedGroupName.replace(/\./g, `\\.`)}.DisplayName`, el.value);
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
        let outStr = ``, tempFormItemOutput = ``, groupOptions = [];

        /// DIV BLOCK 01
        // Select List for Group Edit
        for(let groupKey in InGroupData){
            groupOptions.push({
                TEXT: groupKey
                , VALUE: groupKey
                , TOOL_TIP: `Name: ${InGroupData[groupKey].DisplayName}\nDefault Color: ^${InGroupData[groupKey].ColorCode} ${(appData[`gd-colorcodes`][InGroupData[groupKey].ColorCode]) ? `(${appData[`gd-colorcodes`][InGroupData[groupKey].ColorCode].DisplayName})` : ``}`
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

    OnDropListItem_GroupArrangement: function(e){
        e.preventDefault();
        
        try{
            // Definitions
            let SourceKey = e.dataTransfer.getData(`ListKey`).split(`.`)
                , TargetKey = e.target.getAttribute(`wz-listKey`).split(`.`)
                , ActionData = e.dataTransfer.getData(`ActionData`).split(`.`);
            
            // Logic
            if(SourceKey[0] === TargetKey[0] && SourceKey[0] === ActionData[0] && ActionData[1]){
                // SourceKey --> TargetKey | ActionData[1] string to save.
                // save to db
                if(SourceKey[1] === `Assigned` && TargetKey[1] === `NotAssigned`){
                    // Remove from array.
                    Super.ChangeAssignments(this.CurrentlySelectedGroupName, ActionData, true);
                }else if(SourceKey[1] === `NotAssigned` && TargetKey[1] === `Assigned`){
                    // Add to array.
                    Super.ChangeAssignments(this.CurrentlySelectedGroupName, ActionData);
                }
            }
        }catch(err){Log(err);}

        wzReloadCMS(10);
    },
    Echo_GroupManagerBody: function(InGroupData){
        let outStr = ``, tempFormItemOutput = ``;

        
        // OUT: Group DisplayName Field.
        if(!this.bGroupIsReadOnly && InGroupData[this.CurrentlySelectedGroupName]){
            tempFormItemOutput += Super.tplContent.TextField.wzReplace({
                TEXT: InGroupData[this.CurrentlySelectedGroupName].DisplayName || `Name Required!`
                , ON_CHANGE_FN: `_cms.OnChangeText_FilterGroup_Text(this)`
                , LABEL: `Group Name`
                , SETTINGS: ` style="width: 400px;"`
                , ERROR_MSG: ``
            });
        }

        tempFormItemOutput += Super.MakeColorPicker(`Default Color`, this.CurrentlySelectedGroupName, InGroupData[this.CurrentlySelectedGroupName].ColorCode);

        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Basic Group Settings`
            , CONTENTS: `${tempFormItemOutput}`
        });

        tempFormItemOutput = ``;
        let groupDefs = Super.GetClassData(`Definitions`), curDefData, groupList, listItems;
        for(let defKey in groupDefs){
            groupList = [];
            
            // MAKE ASSIGNED
            listItems = [];
            if(InGroupData[this.CurrentlySelectedGroupName].Keywords[defKey]){
                for(let i = 0; i <= InGroupData[this.CurrentlySelectedGroupName].Keywords[defKey].length - 1; i++){
                    // groupDefs[defKey][i]
                    listItems.push({
                        Text: InGroupData[this.CurrentlySelectedGroupName].Keywords[defKey][i]
                        , ActionData: `${defKey}.${InGroupData[this.CurrentlySelectedGroupName].Keywords[defKey][i]}`
                    });
                }
            }
            groupList.push({
                Name: `${defKey}.Assigned`
                , Text: `Assigned`
                , Items: listItems
            });

            // MAKE UN-ASSIGNED
            listItems = [];
            for(let i = 0; i <= groupDefs[defKey].length - 1; i++){
                // groupDefs[defKey][i]
                if(InGroupData[this.CurrentlySelectedGroupName].Keywords[defKey] && InGroupData[this.CurrentlySelectedGroupName].Keywords[defKey].includes(groupDefs[defKey][i])){
                    // if keyword is defined, nothing really happens, just makes the if easier due to having to check if the keyword is even set otherwise it throws an error.
                }else{
                    listItems.push({
                        Text: groupDefs[defKey][i]
                        , ActionData: `${defKey}.${groupDefs[defKey][i]}`
                    });
                }
                
            }
            groupList.push({
                Name: `${defKey}.NotAssigned`
                , Text: `Not Assigned`
                , Items: listItems
            });
            tempFormItemOutput += new WZ.Core.cDragDropList({
                LegendName: `${defKey}`
                , elementGroup: `${defKey}`
                , OnDrop: `OnDropListItem_GroupArrangement`
                , Lists: groupList
                , SearchTerm: this.SearchTerm || ``
            }).create_();
        }
        //tempFormItemOutput += Super.MakeDragnDropGroup();
        

        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Group Assignments`
            , CONTENTS: `${tempFormItemOutput}`
        });

        return outStr;
    },

    MakeContent_Groups: function(){
        let outStr = ``
            , GroupsData = Super.GetClassData(`GroupData`);

        outStr += this.Echo_GroupManagerHeader(GroupsData);
        if(!this.bGroupIsReadOnly && GroupsData[this.CurrentlySelectedGroupName]) outStr += this.Echo_GroupManagerBody(GroupsData);

        //for(let groupKey in GroupsData){}
        
        return outStr;
    },

    TagsShowAdded: true,
    TagsShowNew: true,
    TagsRestrictedToItems: false,
    CurrentTagPage: 1,
    EntriesPerPage: 50,
    MaxPageCount: 0,

    OnToggleCheckBox_TagsShow: function(el){
        if(el.value === `TagsShowAdded`){
            //this.TagsShowAdded = !this.TagsShowAdded;
        }else if(el.value === `TagsShowNew`){
            //this.TagsShowNew = !this.TagsShowNew;
        }else if(el.value === `TagsRestrictedToItems`){
            //this.TagsShowNew = !this.TagsRestrictedToItems;
        }
        this[el.value] = !this[el.value];
        Super.ResetClassData(`TagInfoData`);
        wzReloadCMS(10);
    },

    OnChange_TagsListComboBox: function(el){
        if(el.value !== ``){
            Super.UpdateTagInfo(el.name, el.value);
        }else{
            let splitName = el.name.split(`.`);
            if(splitName[1] === `Type`){
                Super.DeleteTagInfo(splitName[0]);
                wzReloadCMS(10);
            }else{
                Super.DeleteTagInfo(el.name);
            }
        }
        
    },

    OnClick_ChangeTagPage: function(InType){
        if(InType === `+`){
            this.CurrentTagPage++;
        }else if(InType === `-`){
            this.CurrentTagPage--;
        }else{
            InType = parseInt(InType.value);
            if(InType > 0 && InType <= this.MaxPageCount){
                this.CurrentTagPage = InType;
            }
        }
        wzReloadCMS(10);
    },

    CurrentTagFilter: ``,
    OnChangeText_FilterTags: function(el){
        // el.value
        this.CurrentTagFilter = el.value;

        wzReloadCMS(10);
    },

    MakeContent_Basics: function(){
        let outStr = ``
            , tempFormItemOutput = ``
            , Definitions = Super.GetClassData(`Definitions`)
            , SourceData = Super.GetSourceData()
            , TagData = Super.GetClassData(`TagInfoData`)
            , tplContainer = `<table class="TagsList WzForm"><thead>{TOP_ROW}</thead><tbody>{CONTENTS}</tbody></table>`
            , tplTableTopRow = `<tr><td>{TAG_KEY}</td><td>{TAG_VALUE}</td><td>{TYPE}</td><td>{CLASS}</td><td>{GROUP}</td></tr>`
            , tplTableRow = `<tr wzrowtype="{COUNT}"><td>{TAG_KEY}</td><td>{TAG_VALUE}</td><td>{TYPE}</td><td>{CLASS}</td><td>{GROUP}</td></tr>`
            , strRows = ``;

        
        tempFormItemOutput += Super.tplContent.CheckBox.wzReplace({
            LABEL: `Added`
            , ON_CLICK_FN: `_cms.OnToggleCheckBox_TagsShow(this)`
            , VALUE: `TagsShowAdded`
            , B_CHECKED: (this.TagsShowAdded) ? ` CHECKED` : ``
            //, SETTINGS: ` style="width: 750px;"`
            //, ERROR_MSG: (Super.IsPathCorrect()) ? `` : `Path must be wrong!`
        });
        tempFormItemOutput += Super.tplContent.CheckBox.wzReplace({
            LABEL: `Not Added`
            , ON_CLICK_FN: `_cms.OnToggleCheckBox_TagsShow(this)`
            , VALUE: `TagsShowNew`
            , B_CHECKED: (this.TagsShowNew) ? ` CHECKED` : ``
            //, SETTINGS: ` style="width: 750px;"`
            //, ERROR_MSG: (Super.IsPathCorrect()) ? `` : `Path must be wrong!`
        });
        tempFormItemOutput += Super.tplContent.CheckBox.wzReplace({
            LABEL: `Only Item Tags`
            , ON_CLICK_FN: `_cms.OnToggleCheckBox_TagsShow(this)`
            , VALUE: `TagsRestrictedToItems`
            , B_CHECKED: (this.TagsRestrictedToItems) ? ` CHECKED` : ``
            //, SETTINGS: ` style="width: 750px;"`
            //, ERROR_MSG: (Super.IsPathCorrect()) ? `` : `Path must be wrong!`
        });
        
        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Show Tags - Settings`
            , CONTENTS: `${tempFormItemOutput}`
        });
        Log(SourceData);
        let RowCounter = 1;
        // ---
        for(let fileName in SourceData){
            if(fileName.endsWith(`.txt`) && 
                ( (this.TagsRestrictedToItems) ? fileName.includes(`items`) : true ) ){
                for(let i = 0; i <= SourceData[fileName].length - 1; i++){
                    // See if source data is set (has Key && Value)
                    if(SourceData[fileName][i].TagValue !== `` && SourceData[fileName][i].TagKey !== `` && typeof SourceData[fileName][i].TagValue !== `undefined` && typeof SourceData[fileName][i].TagKey !== `undefined`){
                        // FILTER CHECK for ENTRIES
                        if( 
                            ( (this.CurrentTagFilter !== ``) ? (SourceData[fileName][i].TagValue).toLowerCase().includes(this.CurrentTagFilter.toLowerCase()) : true) || 
                            ( (this.CurrentTagFilter !== ``) ? (SourceData[fileName][i].TagKey).toLowerCase().includes(this.CurrentTagFilter.toLowerCase()) : true) ){
                            // ADDED CHECK
                            if(TagData[SourceData[fileName][i].TagKey] && this.TagsShowAdded){
                                //if(SourceData[fileName][i].TagKey === `tagItemNameAndStack`){ Log(`ok`); }
                                if(this.CurrentTagPage === Math.ceil(RowCounter / this.EntriesPerPage)){
                                    strRows += tplTableRow.wzReplace({
                                        COUNT: RowCounter % 2
                                        , TAG_KEY: `${SourceData[fileName][i].TagKey}`
                                        , TAG_VALUE: SourceData[fileName][i].TagValue
                                        , TYPE: `${Super.MakeForm_ComboBox({
                                            onChangePtr: `_cms.OnChange_TagsListComboBox(this);`
                                            , CheckedValue: TagData[SourceData[fileName][i].TagKey].Type
                                            , bUseTextAsValue: true
                                            , setName: `${SourceData[fileName][i].TagKey}.Type`
                                        }, Definitions.Type)}`
                                        , CLASS: `${Super.MakeForm_ComboBox({
                                            onChangePtr: `_cms.OnChange_TagsListComboBox(this);`
                                            , CheckedValue: TagData[SourceData[fileName][i].TagKey].Classification
                                            , bUseTextAsValue: true
                                            , setName: `${SourceData[fileName][i].TagKey}.Classification`
                                        }, Definitions.Classification)}`
                                        , GROUP: `${Super.MakeForm_ComboBox({
                                            onChangePtr: `_cms.OnChange_TagsListComboBox(this);`
                                            , CheckedValue: TagData[SourceData[fileName][i].TagKey].Group
                                            , bUseTextAsValue: true
                                            , setName: `${SourceData[fileName][i].TagKey}.Group`
                                        }, Definitions.Group)}`
                                    });
                                }
                                
                                RowCounter++;
                            }
                            // NOT ADDED CHECK
                            else if(!TagData[SourceData[fileName][i].TagKey] && this.TagsShowNew && typeof SourceData[fileName][i].TagKey !== `undefined`){
                                if(this.CurrentTagPage === Math.ceil(RowCounter / this.EntriesPerPage)){
                                    strRows += tplTableRow.wzReplace({
                                        COUNT: RowCounter % 2
                                        , TAG_KEY: `${SourceData[fileName][i].TagKey}`
                                        , TAG_VALUE: SourceData[fileName][i].TagValue
                                        , TYPE: `${Super.MakeForm_ComboBox({
                                            onChangePtr: `_cms.OnChange_TagsListComboBox(this);`
                                            , CheckedValue: ``
                                            , bUseTextAsValue: true
                                            , setName: `${SourceData[fileName][i].TagKey}.Type`
                                        }, Definitions.Type)}`
                                        , CLASS: `${Super.MakeForm_ComboBox({
                                            onChangePtr: `_cms.OnChange_TagsListComboBox(this);`
                                            , CheckedValue: ``
                                            , bUseTextAsValue: true
                                            , setName: `${SourceData[fileName][i].TagKey}.Classification`
                                        }, Definitions.Classification)}`
                                        , GROUP: `${Super.MakeForm_ComboBox({
                                            onChangePtr: `_cms.OnChange_TagsListComboBox(this);`
                                            , CheckedValue: ``
                                            , bUseTextAsValue: true
                                            , setName: `${SourceData[fileName][i].TagKey}.Group`
                                        }, Definitions.Group)}`
                                    });
                                }
                                
                                RowCounter++;
                            }
                        }
                    }
                }
            }
        }
        this.MaxPageCount = Math.ceil(RowCounter / this.EntriesPerPage);

        tempFormItemOutput = ``;
        tempFormItemOutput += Super.tplContent.TextField.wzReplace({
            TEXT: `${this.CurrentTagFilter}`
            , ON_CHANGE_FN: `_cms.OnChangeText_FilterTags(this)`
            , LABEL: `Filter Entries by Name/Tag`
            , ERROR_MSG: ``
        });

        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Search & Filter`
            , CONTENTS: `${tempFormItemOutput}`
        });

        outStr += `<div class="PageButtons">${(this.CurrentTagPage > 1) ? `<span class="PageButton" onClick="_cms.OnClick_ChangeTagPage('-')"><</span>` : ``} <input type="text" value="${this.CurrentTagPage}" onChange="_cms.OnClick_ChangeTagPage(this)" style="width: 20px;" /> / ${this.MaxPageCount} ${(this.CurrentTagPage < this.MaxPageCount) ? `<span class="PageButton" onClick="_cms.OnClick_ChangeTagPage('+')">></span>` : ``}</div>`;

        /*
        for(let tagKey in TagData){
            strRows += tplTableRow.wzReplace({
                TAG_KEY: tagKey
                , TAG_VALUE: ``
                , TYPE: ``
                , CLASS: ``
                , GROUP: ``
                , MISC: ``
            });
        }
        */

        // ---
        outStr += tplContainer.wzReplace({
            TOP_ROW: tplTableRow.wzReplace({
                TAG_KEY: `Tag`
                , TAG_VALUE: `Name`
                , TYPE: `Type`
                , CLASS: `Class`
                , GROUP: `Group`
            })
            , CONTENTS: strRows
        });

        return outStr;
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
                text: `Manage Tags for Coloring`
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
