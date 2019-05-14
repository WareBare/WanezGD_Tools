/**
 * Created by WareBare on 3/24/2017.
 */


module.exports = {
    SubPageName: `Settings`,
    Forms: {},
    tplContent: {

    },
    
    Init: function(){},

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
        //Log(SourceData);
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

    content_: function(InContentType){
        this.contentType = InContentType || this.contentType || `Default`;
        
        let Output = ``;
        
        Output += this.MakeContent_Basics();
        
        return Output;
    },
    
    sidebarBtns_: function(){
        let outButtons = [];

        // ---

        return outButtons;
    },
    sidebarList_: function(){
        let outButtons = {};

        // ---

        return outButtons;
    }
    
};
