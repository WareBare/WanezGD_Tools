/**
 * Created by WareBare on 3/24/2017.
 */


module.exports = {
    SubPageName: `Settings`,
    Forms: {},
    tplContent: {

    },
    

    Init: function(){},

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

    content_: function(InContentType){
        //this.contentType = InContentType || this.contentType || `Default`;
        
        let Output = ``;
        
        Output += this.MakeContent_Groups();
        
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
