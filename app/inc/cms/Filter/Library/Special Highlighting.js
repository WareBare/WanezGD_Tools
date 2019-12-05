/**
 * Created by WareBare on 12/02/2019.
 */

module.exports = {
    SubPageName: `Library`,
    Forms: {},
    tplContent: {

    },

    TagData: false,
    AvailableTags: false,

    bResetTags: true,
    RegularTags: false,
    NewTags: false,
    ImportantTags: false,

    CurrentGroups: [],
    CurrentlyOpenedGroup: ``,

    SearchTerm_Name: ``,

    

    Init: function()
    {
        /// ---
    },

    IsGroupUnique: function(InGroupName)
    {
        return (InGroupName != `` && !(this.TagData.Groups[InGroupName]));
    },
    IsCollapsed: function(InToFindStr)
    {
        return (this.TagData.Collapsibles.indexOf(InToFindStr) === -1);
    },

    OnSaveTagData: function()
    {
        Super.ReplaceClassData(`ImportantTags`, this.TagData);
    },

    UpdateGroupAssigedTags: function(InNewGroupName, InOldGroupName)
    {
        for (const kTagName in this.TagData.Tags) {
            if (this.TagData.Tags.hasOwnProperty(kTagName)) {
                const groupName = this.TagData.Tags[kTagName];
                if (InOldGroupName === groupName) {
                    if (InNewGroupName === ``) {
                        delete this.TagData.Tags[kTagName];
                        this.bResetTags = true;
                    }else{
                        this.TagData.Tags[kTagName] = InNewGroupName;
                    }
                    // also remove the old Collapsible entry.
                    //Log(`GroupSettings.${InOldGroupName}`);
                    //Log( (this.TagData.Collapsibles).indexOf(`GroupSettings.${InOldGroupName}`) );
                    if (this.TagData.Collapsibles.indexOf(`GroupSettings.${InOldGroupName}`) !== -1) {
                        this.TagData.Collapsibles.splice(this.TagData.Collapsibles.indexOf(`GroupSettings.${InOldGroupName}`), 1);
                    }
                    
                }
            }
        }
        
    },

    OnChangeText_GroupName: function(InEl, InGroupName)
    {
        let newGroupData = this.TagData.Groups[InGroupName] || {}
            , bAllowDelete = false;
        
        if (this.IsGroupUnique(InEl.value)) {
            this.TagData.Groups[InEl.value] = newGroupData;
            bAllowDelete = true;
        }else if(InEl.value == ``){
            bAllowDelete = true;
        }

        this.OnUpdateState_Collapsible(`GroupSettings.${InGroupName}`);
        this.OnUpdateState_Collapsible(`GroupSettings.${InEl.value}`, false);
        
        this.UpdateGroupAssigedTags(InEl.value, InGroupName);

        if (InGroupName != `` && bAllowDelete) {
            delete this.TagData.Groups[InGroupName];
        }
        //Log(this.TagData.Groups);

        wzReloadCMS(10);
    },
    OnChangeText_GroupSymbol: function(InEl, InGroupName)
    {
        this.TagData.Groups[InGroupName].Symbol = InEl.value;
        this.OnUpdateState_Collapsible(`GroupSettings.${InGroupName}`, false);

        wzReloadCMS(10);
    },
    OnChangeColor_GroupColor: function(InEl, InGroupName)
    {
        this.TagData.Groups[InEl.name].ColorCode = InEl.value;
        this.OnUpdateState_Collapsible(`GroupSettings.${InGroupName}`, false);

        wzReloadCMS(10);
    },
    OnChangeText_FilterTags: function(InEl)
    {
        this.SearchTerm_Name = InEl.value;

        wzReloadCMS(10);
    },
    OnChangeCB_TagListItem: function(InEl, InTagKey)
    {
        /// ---
        //Log(InEl.value);
        if (InEl.value != ``) {
            this.TagData.Tags[InTagKey] = InEl.value;
        }else{
            delete this.TagData.Tags[InTagKey];
        }
        
        this.bResetTags = true;
        wzReloadCMS(10);
    },

    GenerateTagListComboBox: function(InTagKey)
    {
        let outStr = ``
            , selectedKey = this.TagData.Tags[InTagKey] || false
            , outOptions = ``
            , tplOption = `<option{SELECTED}>{OPTION_TEXT}</option>`
            , tplFrame = `<select onchange="_cms.OnChangeCB_TagListItem(this, '{TAG_KEY}')">{OPTIONS}</select>`;

        /// ---
        outOptions += tplOption.wzReplace({
            OPTION_TEXT: ``
            , SELECTED: (selectedKey && selectedKey === ``) ? ` SELECTED` : ``
        });
        for (let i = 0; i < this.CurrentGroups.length; i++) {
            const element = this.CurrentGroups[i];
            outOptions += tplOption.wzReplace({
                OPTION_TEXT: element
                , SELECTED: (selectedKey && selectedKey === element) ? ` SELECTED` : ``
            });
        }

        outStr += tplFrame.wzReplace({
            OPTIONS: outOptions
            , TAG_KEY: InTagKey
        });

        return outStr;
    },
    GenerateTagListItem: function(InTagData = false)
    {
        if (!InTagData) return ``;

        let outStr = ``
            , tagInfoElement = this.AvailableTags[InTagData.TagKey]
            , outListItems = ``
            , tplListFrame = `<div class="ListItemPreview"><ul>{LIST_ITEMS}</ul></div>`
            , tplListItem = `<li>{CONTENT}</li>`;

        outListItems += tplListItem.wzReplace({
            CONTENT: `{COMBOBOX}`
        });
        outListItems += tplListItem.wzReplace({
            CONTENT: `<span>{TAG_VALUE}</span>`
        });
        outListItems += tplListItem.wzReplace({
            CONTENT: `<span>{TAG_CLASSIFICATION} {TAG_TYPE}{GROUP}</span>`
        });
        if(tagInfoElement.VersionNumber){
            outListItems += tplListItem.wzReplace({
                CONTENT: `<span>Version: {TAG_VERSION}</span>`
            });
        }

        outStr += tplListFrame.wzReplace({
            LIST_ITEMS: outListItems.wzReplace({
                COMBOBOX: this.GenerateTagListComboBox(InTagData.TagKey)
                , TAG_VALUE: InTagData.TagValue
                , TAG_CLASSIFICATION: tagInfoElement.Classification
                , TAG_TYPE: tagInfoElement.Type
                , GROUP: (tagInfoElement.Group === `None`) ? `` : ` (${tagInfoElement.Group})`
                , TAG_VERSION: tagInfoElement.VersionNumber
            })
        });

        return outStr;
    },

    MakeContent_TagOverview: function(InSearchTerm)
    {
        let outStr = ``
            , outListItems = ``;

        for (let i = 0; i < this.ImportantTags.length; i++) {
            const element = this.ImportantTags[i];
            if (element.TagValue.toLowerCase().includes(InSearchTerm.toLowerCase())) outListItems += this.GenerateTagListItem(element);
        }

        outStr += outListItems;

        return outStr;
    },

    MakeContent_TagFinder: function(InSearchTerm)
    {
        if(InSearchTerm == ``) return ``;

        let outStr = ``
            , outListItems = ``;

        for (let i = 0; i < this.RegularTags.length; i++) {
            const element = this.RegularTags[i];
            if (element.TagValue.toLowerCase().includes(InSearchTerm.toLowerCase())) outListItems += this.GenerateTagListItem(element);
            //outListItems += this.GenerateTagListItem(element);
        }

        outStr += outListItems;

        return outStr;
    },

    MakeContent_TagFinderNew: function(InSearchTerm)
    {
        let outStr = ``
            , outListItems = ``;

        for (let i = 0; i < this.NewTags.length; i++) {
            const element = this.NewTags[i];
            if (element.TagValue.toLowerCase().includes(InSearchTerm.toLowerCase())) outListItems += this.GenerateTagListItem(element);
        }

        outStr += outListItems;

        return outStr;
    },
    
    GenerateForm_GroupManager: function(InData, InGroupName = ``)
    {
        let outStr = ``
            outForm_01 = ``;
        InData = InData || {};

        /// GROUP_NAME
        outForm_01 += Super.tplContent.TextFieldWithTip.wzReplace({
            TEXT: InGroupName
            , ON_CHANGE_FN: `_cms.OnChangeText_GroupName(this, '${InGroupName}')`
            , LABEL: `Group Name`
            , TOOL_TIP: `<ul><li class="Msg_Warn">must be unique</li><li>Items and Affixes can be sorted into Groups.</li><li>If you want to delete a group: clear this field.</li></ul>`
            , SETTINGS: ` style="width: 250px;"`
            , ERROR_MSG: this.IsGroupUnique(InGroupName) && InGroupName ? `` : `` // Must be Unique!
        });

        if (InGroupName != ``) {
            /// GROUP_SYMBOL
            outForm_01 += Super.tplContent.TextFieldWithTip.wzReplace({
                TEXT: InData.Symbol || ``
                , ON_CHANGE_FN: `_cms.OnChangeText_GroupSymbol(this, '${InGroupName}')`
                , LABEL: `Group Symbol`
                , TOOL_TIP: `<ul><li class="Msg_Warn">If filled in, input will be placed before assigned text.</li></ul>`
                , SETTINGS: ` style="width: 250px;"`
                , ERROR_MSG: `OPTIONAL` // Must be Unique!
            });

            /// #ToDo UNICODE_SELECTOR

            /// COLOR_PICKER
            //outForm_01 += `<br />`
            outForm_01 += Super.MakeColorPicker(`Color Picker`, InGroupName, InData.ColorCode || `Clear`, false, `_cms.OnChangeColor_GroupColor(this, '${InGroupName}')`);
        }

        outStr += `<div>${outForm_01}</div>`;
        
        return outStr;
    },

    MakeContent_TagSettings: function(InSearchTerm)
    {
        let outStr = ``
            , outForm_01 = ``
            , SourceData = Super.GetSourceData();

        //Log(SourceData);

        outForm_01 += Super.tplContent.TextField.wzReplace({
            TEXT: `${InSearchTerm}`
            , ON_CHANGE_FN: `_cms.OnChangeText_FilterTags(this)`
            , LABEL: `Filter Entries by Name`
            , ERROR_MSG: ``
        });

        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Tag Filter Settings`
            , CONTENTS: `${outForm_01}`
        });

        if (this.bResetTags) {
            this.NewTags = [];
            this.RegularTags = [];
            this.ImportantTags = [];

            for (const kFileName in SourceData) {
                if (SourceData.hasOwnProperty(kFileName)) {
                    const elFile = SourceData[kFileName];
                    for (let i = 0; i < elFile.length; i++) {
                        const elTag = elFile[i];
                        if (this.AvailableTags[elTag.TagKey]) {
                            if(this.TagData.Tags[elTag.TagKey]){
                                this.ImportantTags.push({
                                    TagKey: elTag.TagKey
                                    , TagValue: elTag.TagValue
                                });
                            }else if (this.AvailableTags[elTag.TagKey].VersionNumber === Super.LastItemVersion) {
                                this.NewTags.push({
                                    TagKey: elTag.TagKey
                                    , TagValue: elTag.TagValue
                                });
                            }else{
                                this.RegularTags.push({
                                    TagKey: elTag.TagKey
                                    , TagValue: elTag.TagValue
                                });
                            }
                        }
                    }
                }
                this.bResetTags = false;
            }

            /*
            for (const kTagName in this.AvailableTags) {
                if (this.AvailableTags.hasOwnProperty(kTagName)) {
                    const element = this.AvailableTags[kTagName];
                    
                    if (element.VersionNumber === Super.LastItemVersion) {
                        this.NewTags.push({
                            TagKey: kTagName
                            , TagValue: ``
                        });
                    }else if(this.TagData.Tags[kTagName]){
                        this.ImportantTags.push({
                            TagKey: kTagName
                            , TagValue: ``
                        });
                    }else{
                        this.RegularTags.push({
                            TagKey: kTagName
                            , TagValue: ``
                        });
                    }
                }
            }
            */
        }

        return outStr;
    },

    MakeContent_GroupManager: function()
    {
        let outStr = ``
            , outForm_01 = ``;

        this.CurrentGroups = [];

        for (const kGroupName in this.TagData.Groups) {
            if (this.TagData.Groups.hasOwnProperty(kGroupName)) {
                const groupElement = this.TagData.Groups[kGroupName];

                outForm_01 += Super.tplContent.CollapsibleContainer.wzReplace({
                    TITLE: kGroupName
                    , CONTENTS: this.GenerateForm_GroupManager(groupElement, kGroupName)
                    , B_OPEN: ` onclick="_cms.OnUpdateState_Collapsible('GroupSettings.${kGroupName}')"${(this.IsCollapsed(`GroupSettings.${kGroupName}`)) ? `` : ` open`}`
                });
                
                //outForm_01 += `<hr>`
                this.CurrentGroups.push(kGroupName);
            }
        }
        outForm_01 += this.GenerateForm_GroupManager(false);

        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Group Settings`
            , CONTENTS: `${outForm_01}`
        });
        
        return outStr;
    },

    OnUpdateState_Collapsible: function(InCollapsibleName, bInAllowDeletion = true)
    {
        const collapsedIndex = this.TagData.Collapsibles.indexOf(InCollapsibleName);
        if (collapsedIndex !== -1) {
            if (bInAllowDeletion) this.TagData.Collapsibles.splice(collapsedIndex, 1);
        }else{
            this.TagData.Collapsibles.push(InCollapsibleName);
        }
        
        this.OnSaveTagData();
    },

    content_: function(InContentType)
    {
        this.contentType = InContentType || this.contentType || `Default`;
        
        let Output = ``;

        if(!this.TagData){
            this.TagData = Super.GetClassData(`ImportantTags`, false);
            this.TagData.Groups = this.TagData.Groups || {};
            this.TagData.Tags = this.TagData.Tags || {};
            this.TagData.Collapsibles = this.TagData.Collapsibles || [];
        }
        this.OnSaveTagData();

        if(!this.AvailableTags){
            this.AvailableTags = Super.GetClassData(`TagInfoData`);
        }
        let tempTagOutput;
        
        switch (this.contentType) {
            case `GroupSettings`:
                Output += this.MakeContent_GroupManager();
                break;
            case `ImportantTags`:
                Output += this.MakeContent_TagSettings(this.SearchTerm_Name);

                tempTagOutput = this.MakeContent_TagOverview(this.SearchTerm_Name);
                if (tempTagOutput !== ``) {
                    Output += tempTagOutput;
                }
                break;
            case `NewTags`:
                Output += this.MakeContent_TagSettings(this.SearchTerm_Name);
                
                tempTagOutput = this.MakeContent_TagOverview(this.SearchTerm_Name);
                if (tempTagOutput !== ``) {
                    Output += Super.tplContent.CollapsibleContainer.wzReplace({
                        TITLE: `Special Affixes & Items`
                        , CONTENTS: tempTagOutput
                        , B_OPEN: ` onclick="_cms.OnUpdateState_Collapsible('Category.ImportantTags')"${(this.IsCollapsed(`Category.ImportantTags`)) ? `` : ` open`}`
                    });
                }

                tempTagOutput = this.MakeContent_TagFinderNew(this.SearchTerm_Name);
                if (tempTagOutput !== ``) {
                    Output += tempTagOutput;
                }
                break;
            case `RegularTags`:
                Output += this.MakeContent_TagSettings(this.SearchTerm_Name) || `Use the Filter to display Items & Affixes.`;
                
                tempTagOutput = this.MakeContent_TagOverview(this.SearchTerm_Name);
                if (tempTagOutput !== ``) {
                    Output += Super.tplContent.CollapsibleContainer.wzReplace({
                        TITLE: `Special Affixes & Items`
                        , CONTENTS: tempTagOutput
                        , B_OPEN: ` onclick="_cms.OnUpdateState_Collapsible('Category.ImportantTags')"${(this.IsCollapsed(`Category.ImportantTags`)) ? `` : ` open`}`
                    });
                }

                tempTagOutput = this.MakeContent_TagFinder(this.SearchTerm_Name);
                if (tempTagOutput !== ``) {
                    Output += tempTagOutput;
                }
                break;
            default:
                Output += this.MakeContent_GroupManager();

                if (this.CurrentGroups.length) {
                    Output += this.MakeContent_TagSettings(this.SearchTerm_Name);

                    tempTagOutput = this.MakeContent_TagOverview(this.SearchTerm_Name);
                    if (tempTagOutput !== ``) {
                        Output += Super.tplContent.CollapsibleContainer.wzReplace({
                            TITLE: `Special Affixes & Items`
                            , CONTENTS: tempTagOutput
                            , B_OPEN: ` onclick="_cms.OnUpdateState_Collapsible('Category.ImportantTags')"${(this.IsCollapsed(`Category.ImportantTags`)) ? `` : ` open`}`
                        });
                    }
                    
                    tempTagOutput = this.MakeContent_TagFinderNew(this.SearchTerm_Name);
                    if (tempTagOutput !== ``) {
                        Output += Super.tplContent.CollapsibleContainer.wzReplace({
                            TITLE: `Most Recently Added Affixes & Items`
                            , CONTENTS: tempTagOutput
                            , B_OPEN: ` onclick="_cms.OnUpdateState_Collapsible('Category.NewTags')"${(this.IsCollapsed(`Category.NewTags`)) ? `` : ` open`}`
                        });
                    }

                    tempTagOutput = this.MakeContent_TagFinder(this.SearchTerm_Name) || `Use the Filter to display Items & Affixes.`;
                    if (tempTagOutput !== ``) {
                        Output += Super.tplContent.CollapsibleContainer.wzReplace({
                            TITLE: `All Affixes & Items`
                            , CONTENTS: tempTagOutput
                            , B_OPEN: ` onclick="_cms.OnUpdateState_Collapsible('Category.RegularTags')"${(this.IsCollapsed(`Category.RegularTags`)) ? `` : ` open`}`
                        });
                    }else{
                        
                    }
                }
                break;
        }
        
        return Output;
    },
    
    sidebarBtns_: function()
    {
        let outButtons = Super.sidebarBtns_();

        // ---

        return outButtons;
    },
    sidebarList_: function()
    {
        let outButtons = {};

        outButtons[`Default`] = {
            text: `Complete Overview`
        }
        outButtons[`GroupSettings`] = {
            text: `Group Settings`
        }
        if (this.CurrentGroups.length) {
            outButtons[`ImportantTags`] = {
                text: `Special Items & Affixes`
            }
            outButtons[`NewTags`] = {
                text: `New Items & Affixes`
            }
            outButtons[`RegularTags`] = {
                text: `All Items & Affixes`
            }
        }

        // ---
        //outButtons = {};

        return outButtons;
    }
    
};
