/**
 * 
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    Forms: {},
    tplContent: {},

    LibraryData: false,
    GroupData: false,
    CurrentPackageNameInput: ``,
    bShowAdvancedOptions: false,

    CheckPackageNameDupe: function(){
        let bOutIsDupe = false, tempData;

        // ---
        if(this.CurrentPackageNameInput !== this.LibraryData.PackageName){
            bOutIsDupe = Super.ReadData(tempData = {}, `LibraryData`, `PackageName`, `${this.CurrentPackageNameInput}`);
        }

        return bOutIsDupe;
    },

    OnChangeText_LibraryPackageName: function(el){
        if(el.value !== ``){
            this.CurrentPackageNameInput = el.value;
            wzReloadCMS(10);
        }
    },
    OnChangeText_LibraryDisplayName: function(el){
        if(el.value !== ``){
            this.LibraryData.DisplayName = el.value;
            Super.UpdateLibrary(this.contentType, this.LibraryData);
        }
    },
    OnChangeText_LibraryVersion: function(el){
        if(el.value !== ``){
            this.LibraryData.Version = el.value;
            Super.UpdateLibrary(this.contentType, this.LibraryData);
        }
    },
    OnDropListItem_GroupManage: function(e){
        e.preventDefault();
        try{
            // Definitions
            let SourceKey = e.dataTransfer.getData(`ListKey`).split(`::`)
                , TargetKey = e.target.getAttribute(`wz-listKey`).split(`::`)
                , ActionData = e.dataTransfer.getData(`ActionData`).split(`::`);
            
            Log(SourceKey);
            Log(TargetKey);
            Log(ActionData);
            // Logic
            if(SourceKey[0] === TargetKey[0] && SourceKey[0] === ActionData[0] && ActionData[1]){
                // SourceKey --> TargetKey | ActionData[1] string to save.
                // save to db
                if(SourceKey[1] === `Default` && TargetKey[1] === `Library`){
                    // Add to array.
                    this.LibraryData.Data.push({
                        GroupName: ActionData[1]
                    });
                    Super.UpdateLibrary(this.contentType, this.LibraryData);
                }else if(SourceKey[1] === `Library` && TargetKey[1] === `Default`){
                    // Remove from array.
                    let dataIndex = this.LibraryData.Data.findIndex( x => x.GroupName === ActionData[1] );
                    if(dataIndex !== -1){
                        this.LibraryData.Data.splice(dataIndex, 1);
                        Super.UpdateLibrary(this.contentType, this.LibraryData);
                    }
                    //Super.ChangeAssignments(this.CurrentlySelectedGroupName, ActionData);
                }
            }
        }catch(err){Log(err);}

        wzReloadCMS(10);
    },

    ActiveListItem: false,
    OnClickListItem_GroupManage: function(el){
        if(el.innerHTML !== this.ActiveListItem){
            this.ActiveListItem = el.innerHTML;
        }else{
            this.ActiveListItem = false;
        }

        wzReloadCMS(10);
    },
    UpdateGroupIndexInLibrary: function(bInMoveUp){
        let dataIndex = this.LibraryData.Data.findIndex( x => x.GroupName === this.ActiveListItem);

        if(dataIndex === -1) return false;


        if(bInMoveUp){
            if(dataIndex === 0) return false;
            this.LibraryData.Data.splice(dataIndex - 1, 0, this.LibraryData.Data[dataIndex]);
            this.LibraryData.Data.splice(dataIndex + 1, 1);
        }else{
            if(dataIndex === this.LibraryData.Data.length - 1) return false;
            this.LibraryData.Data.splice(dataIndex + 2, 0, this.LibraryData.Data[dataIndex]);
            this.LibraryData.Data.splice(dataIndex, 1);
            //Log(`Move DOWN`);
        }
        Super.UpdateLibrary(this.contentType, this.LibraryData);
        //Log(this.LibraryData);
        //Log(Super.UpdateLibrary(this.contentType, this.LibraryData));
    },

    OnToggleCheckBox_ShowAdvancedOptions: function(el){
        this.bShowAdvancedOptions = el.checked;

        wzReloadCMS(10);
    },

    Content_Header: function(InLibraryData, InGroupData){
        let outStr = ``
            , groupList = []
            , groupItemsDefault = []
            , groupItemsLibrary = []
            , tempFormItemOutput = ``
            , tempFormItemOutput2 = ``;


        // ---
        tempFormItemOutput += Super.tplContent.TextFieldWithTip.wzReplace({
            TEXT: this.CurrentPackageNameInput || `Name Required!`
            , ON_CHANGE_FN: `_cms.OnChangeText_LibraryPackageName(this)`
            , LABEL: `Package Name`
            , TOOL_TIP: `<ul><li class="Msg_Warn">must be unique</li><li>Identifies Library Entries</li></ul>`
            , SETTINGS: ` style="width: 250px;"`
            , ERROR_MSG: this.CheckPackageNameDupe() ? `Must be Unique!` : ``
        });

        if(InLibraryData.bReadOnly){
            // Read Only
            outStr += `<span class="Msg_Warn">This entry is ReadOnly, you cannot change its settings, but you can make a new one based on it. When you change the Package Name to something that does not yet exist and different to the current one, you will see a new button on the right to "Create New Entry". The name can be updated later with another button "Update Entry" as well as other data.</span><br />`;
        }else{
            // Writable
            tempFormItemOutput += Super.tplContent.TextFieldWithTip.wzReplace({
                TEXT: this.LibraryData.DisplayName || `Name Required!`
                , ON_CHANGE_FN: `_cms.OnChangeText_LibraryDisplayName(this)`
                , LABEL: `Name`
                , TOOL_TIP: `<ul><li>Visible Name in the list on the right.</li></ul>`
                , SETTINGS: ` style="width: 250px;"`
                , ERROR_MSG: ``
            });
            tempFormItemOutput += Super.tplContent.TextFieldWithTip.wzReplace({
                TEXT: this.LibraryData.Version || `Name Required!`
                , ON_CHANGE_FN: `_cms.OnChangeText_LibraryVersion(this)`
                , LABEL: `Version`
                , TOOL_TIP: `<ul><li>Optional</li><li>Entirely up to you, what goes in this field.</li><li>Feature for later, when you can package color codes for others.</li></ul>`
                , SETTINGS: ` style="width: 50px;"`
                , ERROR_MSG: ``
            });
            
            tempFormItemOutput += Super.tplContent.CheckBox.wzReplace({
                LABEL: `Show Advanced Options`
                , ON_CLICK_FN: `_cms.OnToggleCheckBox_ShowAdvancedOptions(this)`
                , VALUE: `ShowAdvancedOptions`
                , B_CHECKED: (this.bShowAdvancedOptions) ? ` CHECKED` : ``
            });

            /// ADVANCED OPTIONS
            if(this.bShowAdvancedOptions){
                for(let groupKey in InGroupData){
                    if( InLibraryData.Data.findIndex( libData => libData[`GroupName`] == groupKey) === -1 ){
                        groupItemsDefault.push({
                            Text: `${groupKey}`
                            , ActionData: `manage::${groupKey}`
                            , bChecked: (this.ActiveListItem === groupKey)
                        });
                    }
                }
                for(let i = 0; i < InLibraryData.Data.length; i++){
                    groupItemsLibrary.push({
                        Text: `${InLibraryData.Data[i].GroupName}`
                        , ActionData: `manage::${InLibraryData.Data[i].GroupName}`
                        , bChecked: (this.ActiveListItem === InLibraryData.Data[i].GroupName)
                        , OnClick: `_cms.OnClickListItem_GroupManage(this)`
                    });
                }
                groupList.push({
                    Name: `manage::Default`
                    , Text: `Not Assigned`
                    , Items: groupItemsDefault
                });
                groupList.push({
                    Name: `manage::Library`
                    , Text: `Assigned`
                    , Items: groupItemsLibrary
                });
                tempFormItemOutput2 += new WZ.Core.cDragDropList({
                    LegendName: `Manage Coloring-Groups`
                    , elementGroup: `groupmanage`
                    , OnDrop: `OnDropListItem_GroupManage`
                    , Lists: groupList
                    , SearchTerm: this.SearchTerm || ``
                    , Width: 300
                }).create_();
    
                if(this.ActiveListItem){
                    // ---
                    tempFormItemOutput2 += `<span class="Msg_Warn">Use Arrow Key Up/Down to move Coloring-Group.</span>`;
                }
            }

            
        }
        
        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Manage Library Entry`
            , CONTENTS: `${tempFormItemOutput}`
        });

        outStr += `<div style="display: inline-block;">${tempFormItemOutput2}</div>`;

        return outStr;
    },

    Content_ColorPicker: function(InLibraryData, InGroupData){
        let outStr = ``
            , outByTypes = {}
            , tempFormItemOutput = ``
            , tempFormItemOutput2 = ``
            , curGroupInfo;
        
        if(InLibraryData.bReadOnly){
            tempFormItemOutput += `<span class="Msg_Warn">This entry is ReadOnly, you may view its colors, but not change them, but you may create a copy of this library entry and change the copy to your needs.</span><br />`;
        }

        for(let i = 0; i <= InLibraryData.Data.length - 1; i++){
            // --- InLibraryData.Data[i].ColorCode
            curGroupInfo = Object.assign({}, InGroupData[InLibraryData.Data[i].GroupName]);
            if(InLibraryData.Data[i].ColorCode) curGroupInfo.ColorCode = InLibraryData.Data[i].ColorCode;

            outByTypes[curGroupInfo.Keywords.Type[0]] = outByTypes[curGroupInfo.Keywords.Type[0]] || [];
            outByTypes[curGroupInfo.Keywords.Type[0]].push(Super.MakeColorPicker(curGroupInfo.DisplayName, InLibraryData.Data[i].GroupName, curGroupInfo.ColorCode, InLibraryData.bReadOnly || false));
        }

        for(let keywordKey in outByTypes){
            tempFormItemOutput2 = ``;
            for(let i = 0; i <= outByTypes[keywordKey].length - 1; i++){
                // outByTypes[keywordKey][i]
                tempFormItemOutput2 += outByTypes[keywordKey][i];
            }
            tempFormItemOutput += Super.tplContent.CollapsibleContainer.wzReplace({
                TITLE: keywordKey
                , CONTENTS: tempFormItemOutput2
            });
        }

        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Color per Group`
            , CONTENTS: `${tempFormItemOutput}`
        });

        return outStr;
    },
    
    content_: function(InContentType){
        let outStr = ``;

        if(!Super.IsPathCorrect()) return `<span class="Msg_Warn">You must set the correct Path in "Settings" first, if you think you got it right please check if you have an ArchiveTool.exe inside that directory.</span>`;
        
        this.GroupData = Super.GetClassData(`GroupData`);


        if(InContentType !== this.contentType && this.contentType !== `undefined`){
            // Reset TagInfo when different Library is loaded, as it may change it.
            Super.ResetClassData(`TagInfoData`);
        }
        
        this.contentType = this.contentType || appConfig.get(`GrimDawn.ColorLibrary`);
        // first load used library in slot 1, then sets contentType and can use ContentType to load data.
        if(typeof this.contentType === `undefined`) {
            Super.ReadData(this.LibraryData = {}, `LibraryData`, 0);
            this.CurrentPackageNameInput = this.LibraryData.PackageName;
        }
        this.contentType = InContentType || this.contentType || this.LibraryData.PackageName;
        if(this.LibraryData.PackageName !== this.contentType){
            Super.ReadData(this.LibraryData = {}, `LibraryData`, `PackageName`, `${this.contentType}`);
            this.CurrentPackageNameInput = this.contentType;
            this.ActiveListItem = false;
        }
        
        appConfig.set(`GrimDawn.ColorLibrary`, this.contentType);
        
        /// OUTPUT
        outStr += this.Content_Header(this.LibraryData, this.GroupData);
        outStr += this.Content_ColorPicker(this.LibraryData, this.GroupData);
        

        return outStr;
    },
    
    FindAndUpdateSourceEntry: function(OutSourceData, InFileName, InKeyToFind, InValueReplace){
        let tempIndex = OutSourceData[InFileName].findIndex( DefKey => (DefKey.TagKey || ``).toLowerCase() === InKeyToFind.toLowerCase() )
            , bOutFoundAndUpdated = false;

        if(tempIndex !== -1){
            OutSourceData[InFileName][tempIndex].TagValue = InValueReplace.wzReplace({
                VALUE: OutSourceData[InFileName][tempIndex].TagValue
            });
            OutSourceData[InFileName][0].bUpdated = true;
            Log(`FOUND!`);
            bOutFoundAndUpdated = true;
        }else{
            Log(`NOT FOUND!`);
        }
        
        return bOutFoundAndUpdated;
    },

    UpdateSourceTag: function(OutSourceData, InKeyToFind, InTagValue, bInUpdateDef = false){
        let tempIndex, bUpdated = false;

        if(bInUpdateDef){
            // check if updated before, only update if it wasn't before, no need to do it twice.
            if(!OutSourceData[`language.def`][0].bUpdated){
                this.FindAndUpdateSourceEntry(OutSourceData, `language.def`, InKeyToFind, InTagValue);
            }
        }else{
            // first loop is through those that have been updated before.
            for(let sourceIndex in OutSourceData){
                if(OutSourceData[sourceIndex][0].bUpdated){
                    bUpdated = this.FindAndUpdateSourceEntry(OutSourceData, `language.def`, InKeyToFind, InTagValue) || bUpdated;
                }
            }
            // second loop through those that have not been updated before, only when nothing was found before.
            if(!bUpdated){
                for(let sourceIndex in OutSourceData){
                    if(!OutSourceData[sourceIndex][0].bUpdated){
                        bUpdated = this.FindAndUpdateSourceEntry(OutSourceData, `language.def`, InKeyToFind, InTagValue) || bUpdated;
                    }
                }
            }
        }

        if(!bUpdated) Log(`Entry not found!`);
        
    },

    FetchColorFromGroup: function(InLibraryGroupEntry){
        // Uses either Library ColorCode (if set) or Group Color Code (as default).
        return InLibraryGroupEntry.ColorCode || this.GroupData[InLibraryGroupEntry.GroupName].ColorCode;
    },

    /**
     * Checks if Group has a match for Tag Keyword.
     * @param {string} InGroupName name of the group to check in GroupData
     * @param {string} InKeywordKey key for Keywords (like Type, Classification, Group)
     * @param {string} InKeywordCheck The Keyword to look for (like MI or Regular Item)
     */
    DoesGroupMatchKeywords: function(InGroupName, InKeywordKey, InKeywordCheck){
        // #DECLARATION
        let bOutMatch = false;

        // #VALIDATION
        if(!this.GroupData[InGroupName]) return (InKeywordKey === `Type`) ? false : true;
        if(!this.GroupData[InGroupName].Keywords[InKeywordKey]) return (InKeywordKey === `Type`) ? false : true;

        // #LOGIC
        bOutMatch = this.GroupData[InGroupName].Keywords[InKeywordKey].includes(InKeywordCheck[InKeywordKey]);

        return bOutMatch;
    },

    FetchColorCodeForTag: function(InGroupKeywords){
        // ---
        let bFoundColor = false, colorCode = false;
        for(let i = 0; i < this.LibraryData.Data.length; i++){
            //bGroupMismatch = false;
            bFoundColor = this.DoesGroupMatchKeywords(this.LibraryData.Data[i].GroupName, `Type`, InGroupKeywords);

            if(bFoundColor) bFoundColor = this.DoesGroupMatchKeywords(this.LibraryData.Data[i].GroupName, `Classification`, InGroupKeywords);

            if(bFoundColor) bFoundColor = this.DoesGroupMatchKeywords(this.LibraryData.Data[i].GroupName, `Group`, InGroupKeywords);
            
            //if(!bGroupMismatch) bFoundColor = true;
            if(!colorCode && bFoundColor){
                colorCode = this.FetchColorFromGroup(this.LibraryData.Data[i]);
                i = this.LibraryData.Data.length;
            }
        }
        
        return colorCode;
    },

    IsSymbolDisabledByLibrary: function(InKeywords, InKeywordGroupName){
        let bIsDisabled = false;

        if(this.LibraryData.DisabledSymbols){
            // #WiP
            if(this.LibraryData.DisabledSymbols.includes(`${InKeywordGroupName}.${InKeywords[InKeywordGroupName]}`)){
                bIsDisabled = true;
            }
        }

        return bIsDisabled;
    },

    ApplyColorInSourceData: function(OutSourceData, InFileName, InIndex, InColorCode, InKeywords){
        //Log(InColorCode);
        if(InColorCode === `Clear` || !InColorCode) return false;
        //Log(InColorCode);
        //Log(OutSourceData[InFileName][InIndex].TagValue);
        let newValue = OutSourceData[InFileName][InIndex].TagValue
            , TypeSymbol = ( this.IsSymbolDisabledByLibrary(InKeywords, `Type`) ) ? `` : Super.MakeSymbol(`Type`, InKeywords)
            , ClassificationSymbol = ( this.IsSymbolDisabledByLibrary(InKeywords, `Classification`) ) ? `` : Super.MakeSymbol(`Classification`, InKeywords)
            , GroupSymbol = ( this.IsSymbolDisabledByLibrary(InKeywords, `Group`) ) ? `` : Super.MakeSymbol(`Group`, InKeywords)
            , colorCode = `${TypeSymbol}${ClassificationSymbol}${GroupSymbol}{^${InColorCode.toUpperCase()}}`;
        

        if(newValue.includes(`{^E}`)){
            newValue = `${newValue.replace(`{^E}`, `${colorCode}`)}{^E}`;
        }else if(newValue.match(/{\^[A-Za-z]}/g)){
            newValue = newValue.replace(/{\^[A-Za-z]}/g, colorCode);
        }else if(newValue.startsWith(`[`) || newValue.startsWith(`\$[`)){
            newValue = newValue.replace(/(\[[a-zA-Z]+])/g, `$1${colorCode}`);
            //Log(newValue);
        }else if(newValue.match(RegexGlobalLetters)){
            newValue = `${colorCode}${newValue}`;
            //Log(newValue);
        }
        if(OutSourceData[InFileName][InIndex].TagKey.includes(`Conversion`)){
            newValue += `{^E}`;
            //Log(newValue);
        }

        if(OutSourceData[InFileName][InIndex].TagValue !== newValue){
            OutSourceData[InFileName][0].bUpdated = true;
            OutSourceData[InFileName][InIndex].TagValue = newValue;
            //Log(OutSourceData[InFileName][InIndex].TagValue);
        }else{
            Log(OutSourceData[InFileName][InIndex].TagValue);
        }
    },

    FindTagAndApplyColorInSourceData: function(OutSourceData, InTagKey, InColorCode, InKeywords){
        // ---
        let bFoundEntry = false
            , foundIndex = -1
            , fileName;
        //Log(`${InTagKey} --- ${InColorCode}`);
        // loop files with previous changes, ignore others.
        for(let fileKey in OutSourceData){
            //Log(fileKey);
            if(OutSourceData[fileKey][0].bUpdated && foundIndex === -1){
                foundIndex = OutSourceData[fileKey].findIndex( x => x.TagKey === InTagKey );
                if(foundIndex !== -1) this.ApplyColorInSourceData(OutSourceData, fileKey, foundIndex, InColorCode, InKeywords);
                // #BugFix - Russian Localization
                if(fileKey === `tags_gmreplacer.txt` && foundIndex !== -1){
                    //Log(`found match`);
                    foundIndex = -1;
                }
                //foundIndex = -1;
                //if(foundIndex !== -1) fileName = fileKey;
            }
        }
        
        // loopt files without previous changes if no entry found yet.
        if(foundIndex === -1){
            for(let fileKey in OutSourceData){
                //Log(OutSourceData[fileKey][0].bUpdated);
                if(!OutSourceData[fileKey][0].bUpdated && foundIndex === -1){
                    foundIndex = OutSourceData[fileKey].findIndex( x => x.TagKey === InTagKey );
                    if(foundIndex !== -1) this.ApplyColorInSourceData(OutSourceData, fileKey, foundIndex, InColorCode, InKeywords);
                    // #BugFix - Russian Localization
                    if(fileKey === `tags_gmreplacer.txt` && foundIndex !== -1){
                        //Log(`found match`);
                        foundIndex = -1;
                    }
                    //foundIndex = -1;
                    //if(foundIndex !== -1) fileName = fileKey;
                }
            }
        }

    },

    UpdateSourceData: function(OutSourceData){
        let outNewSourceData = OutSourceData
            , tagInfoData = Super.GetClassData(`TagInfoData`);
        
        for(let tagKey in tagInfoData){
            // Applies color to tag inside sourceData and gets the colorCode for tag from group
            this.FindTagAndApplyColorInSourceData(OutSourceData, tagKey, this.FetchColorCodeForTag(tagInfoData[tagKey]), tagInfoData[tagKey]);
        }

        // ---

        return outNewSourceData;
    },

    OnClick_WriteColors: function(){
        let SourceData = Super.GetSourceData()
            , savePath;

        this.UpdateSourceData(SourceData);

        if(Super.IsUsingLocale()){
            let zip = new JSZip();
            savePath = `${Super.GetGrimDawnPath()}/localization`;

            //SourceData[`language.def`][SourceData[`language.def`].find(  )] // [C]
            this.UpdateSourceTag(SourceData, `language`, `[C] {VALUE} ${this.contentType}`, true);
            if(appConfig.get(`Filter.bZipChanges`)){
                // Save Filter as .zip using Locale in /localization/*.zip
                let zipSuffix = `_${this.contentType}_C_`;
                // --- appConfig.get(`Filter.LocaleFileName`)
                fs.readFile(`${savePath}/${appConfig.get(`Filter.LocaleFileName`)}`, function(err, data) {
                    if (err) throw err;
                    zip.loadAsync(data).then(function (zip) {
                        for(let fileKey in SourceData){
                            if(SourceData[fileKey][0].bUpdated){
                                zip.file(`${fileKey}`, Super.StringifyTagData(SourceData[fileKey]));
                            }
                        }
                        
                        zip
                        .generateNodeStream({type:'nodebuffer', streamFiles:true, compression: "DEFLATE"})
                        .pipe(fs.createWriteStream(`${savePath}/${appConfig.get(`Filter.LocaleFileName`).replace(`.zip`, `${zipSuffix}.zip`)}`))
                        .on('finish', function () {
                            // JSZip generates a readable stream with a "end" event,
                            // but is piped here in a writable stream which emits a "finish" event.
                            wzNotify.save(`${appConfig.get(`Filter.LocaleFileName`).replace(`.zip`, `${zipSuffix}.zip`)}`);
                            //console.log("out.zip written.");
                        });
                    });
                });
            }else{
                // Save Filter Files using Locale in /localization/
                for(let fileKey in SourceData){
                    if(SourceData[fileKey][0].bUpdated){
                        wzIO.file_put_contents(`${savePath}/${fileKey}`, Super.StringifyTagData(SourceData[fileKey]), savePath);
                    }
                }
            }
        }else{
            if(appConfig.get(`Filter.bEnableAutoDelete`)){
                Super.OnDeleteOldFiles();
            }
            // Save Filter Files in /settings/
            savePath = `${Super.GetGrimDawnPath()}/settings/text_en`;
            let zip = new JSZip()
                , zipName = `${this.contentType}-${this.LibraryData.Version}.zip`;
            
            for(let fileKey in SourceData){
                if(SourceData[fileKey][0].bUpdated){
                    wzIO.file_put_contents(`${savePath}/${fileKey}`, Super.StringifyTagData(SourceData[fileKey]), savePath);
                    if(appConfig.get(`GrimDawn.Paths.UserData`) && appConfig.get(`GrimDawn.Paths.UserData`) !== ``){
                        wzIO.file_put_contents(`${appConfig.get(`GrimDawn.Paths.UserData`).replace(/\\/g, `/`).replace(`/Settings`, ``)}/Settings/text_en/${fileKey}`, Super.StringifyTagData(SourceData[fileKey]), savePath);
                    }
                    if(appConfig.get(`Filter.bMakeZipForTextEn`)){
                        zip.file(`Grim Dawn/settings/text_en/${fileKey}`, Super.StringifyTagData(SourceData[fileKey]));
                    }
                }
            }
            // ---
            if(appConfig.get(`Filter.bMakeZipForTextEn`)){
                zip
                .generateNodeStream({type:'nodebuffer', streamFiles:true, compression: "DEFLATE"})
                .pipe(fs.createWriteStream(`${Super.GetGrimDawnPath()}/settings/${zipName}`))
                .on('finish', function () {
                    // JSZip generates a readable stream with a "end" event,
                    // but is piped here in a writable stream which emits a "finish" event.
                    wzNotify.save(`settings/${zipName}`);
                    //console.log("out.zip written.");
                });
            }
        }
        
    },

    OnClick_CreateLibraryEntry: function(){
        // change data.
        this.LibraryData.DisplayName = `${this.LibraryData.DisplayName} (NEW)`;
        this.LibraryData.PackageName = this.CurrentPackageNameInput;
        this.LibraryData.Version = `0.0`;
        // DELETE
        delete this.LibraryData.InSearchKey;
        delete this.LibraryData.bReadOnly;
        // CALL UPDATE
        Super.UpdateLibrary(this.CurrentPackageNameInput, this.LibraryData);
        // load new entry after reload.
        this.contentType = this.CurrentPackageNameInput;
    },
    OnClick_UpdateLibraryEntry: function(){
        this.LibraryData.PackageName = this.CurrentPackageNameInput;
        Super.UpdateLibrary(this.contentType, this.LibraryData);
        // load new entry after reload.
        this.contentType = this.CurrentPackageNameInput;
    },
    OnClick_DeleteLibraryEntry: function(){
        Super.UpdateLibrary(this.contentType);
        // load new entry after reload.
        Super.ReadData(this.LibraryData = {}, `LibraryData`, 0);
        this.CurrentPackageNameInput = this.LibraryData.PackageName;
        this.contentType = this.CurrentPackageNameInput;
    },
    
    sidebarBtns_: function(){
        let outButtons = [];

        if(!Super.IsPathCorrect()) return outButtons;
        
        if(appConfig.get(`GrimDawn.Paths.Game`)){
            outButtons.push({
                "ONCLICK": "_cms.OnClick_WriteColors()",
                "TEXT": "Save Colors"
            });
            if(!this.CheckPackageNameDupe() && this.contentType !== this.CurrentPackageNameInput){
                outButtons.push({
                    "ONCLICK": "_cms.OnClick_CreateLibraryEntry()",
                    "TEXT": "Create New Entry"
                });
                if(!this.LibraryData.bReadOnly){
                    outButtons.push({
                        "ONCLICK": "_cms.OnClick_UpdateLibraryEntry()",
                        "TEXT": "Update Entry"
                    });
                }
            }else{
                if(!this.LibraryData.bReadOnly){
                    outButtons.push({
                        "ONCLICK": "_cms.OnClick_DeleteLibraryEntry()",
                        "TEXT": "Delete Entry"
                    });
                }
            }
        }

        return outButtons;
    },
    sidebarList_: function(){
        if(!Super.IsPathCorrect()) return {};

        let OutList = {}
            , LibraryData = Super.GetLibraryData();
        
        for(let libraryIndex in LibraryData){
            OutList[`${LibraryData[libraryIndex].PackageName}`] = {
                text: `${LibraryData[libraryIndex].DisplayName}`
            }
        }
        //Log(LibraryData);
        /*
        for(let kContenType in this.FilterConfig.store){
            mList[kContenType] = [];
        }
        */
        
        return OutList;
    }
    
};
