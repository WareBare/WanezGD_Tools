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
    
    Content_Manager: function(InLibraryData, InGroupData){
        let outStr = ``;

        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Creation`
            , CONTENTS: `${tempFormItemOutput}`
        });

        return outStr;
    },

    Content_Header: function(InLibraryData, InGroupData){
        let outStr = ``
            , tempFormItemOutput = ``;

        if(InLibraryData.bReadOnly){
            // Read Only
            tempFormItemOutput += `<span class="Msg_Warn">This entry is ReadOnly, you cannot change its settings, but you can make a new one based on it.</span><br />`;
        }else{
            // Writable
        }
        
        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Manage Library Entry`
            , CONTENTS: `${tempFormItemOutput}`
        });

        return outStr;
    },

    Content_ColorPicker: function(InLibraryData, InGroupData){
        let outStr = ``
            , outByTypes = {}
            , tempFormItemOutput = ``
            , tempFormItemOutput2 = ``
            , curGroupInfo;
        
        if(InLibraryData.bReadOnly){
            tempFormItemOutput += `<span class="Msg_Warn">This entry is ReadOnly, you may view its colors, but not change them, you are able to clone this library entry and change it then.</span><br />`;
        }

        for(let i = 0; i <= InLibraryData.Data.length - 1; i++){
            // --- InLibraryData.Data[i].ColorCode
            curGroupInfo = Object.assign({}, InGroupData[InLibraryData.Data[i].GroupName]);
            if(InLibraryData.Data[i].ColorCode) curGroupInfo.ColorCode = InLibraryData.Data[i].ColorCode;

            outByTypes[curGroupInfo.Keywords.Type[0]] = outByTypes[curGroupInfo.Keywords.Type[0]] || [];
            outByTypes[curGroupInfo.Keywords.Type[0]].push(Super.MakeColorPicker(curGroupInfo.DisplayName, InLibraryData.Data[i].GroupName, curGroupInfo.ColorCode));
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
        let outStr = ``
            //, CurrentContentType = this.contentType
            , LibraryData
            , groupData = Super.GetClassData(`GroupData`);
        
        if(InContentType !== this.contentType && this.contentType !== `undefined`){
            // Reset TagInfo when different Library is loaded, as it may change it.
            //Super.ResetClassData(`TagInfoData`);
        }
        Super.ReadData(LibraryData = {}, `LibraryData`, 0);
        this.contentType = InContentType || this.contentType || LibraryData.PackageName;
        //Log(LibraryData);

        outStr += this.Content_Header(LibraryData, groupData);
        if(!LibraryData.bReadOnly){

        }else{
            
            outStr += this.Content_ColorPicker(LibraryData, groupData);
        }
        
        /*
        let tempData = Super.GetSourceData();
        if(Object.keys(tempData).length){
            Log(tempData);
            Log(Super.GetSourceData());
        }
        
        if(Super.ReadData(LibraryData = {}, `LibraryData`, `PackageName`, `${this.contentType}`)){
            Log(LibraryData);
        }
        */

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

    OnClickSaveFilter: function(){
        let SourceData = Super.GetSourceData();

        if(Super.IsUsingLocale()){
            let zip = new JSZip();

            //SourceData[`language.def`][SourceData[`language.def`].find(  )]
            this.UpdateSourceTag(SourceData, `language`, `{VALUE} [C]`, true);
            if(appConfig.get(`Filter.bZipChanges`)){
                // Save Filter as .zip using Locale in /localization/*.zip
                Log(`Save Zip`);
            }else{
                // #ToDo Save Filter Files using Locale in /localization/
                Log(`Save Locale Files`);
            }
        }else{
            // Save Filter Files in /settings/
            Log(`Save Files (in /settings/text_en/)`);
        }
        
        Log(SourceData);
        /*
        fs.readFile(`${Super.GetGrimDawnPath()}/localization/community_russian_bak.zip`, function(err, data) {
            if (err) throw err;
            zip.loadAsync(data).then(function (zip) {
                //Log(zip);
                //zip.file("hello.txt", "Hello World\n");
                zip.file("language.def").async("string").then(function (data) {
                    // data is "Hello World\n"
                    Log(data);
                  });
                zip
                .generateNodeStream({type:'nodebuffer',streamFiles:true})
                .pipe(fs.createWriteStream(`${Super.GetGrimDawnPath()}/localization/community_russian_bak5.zip`))
                .on('finish', function () {
                    // JSZip generates a readable stream with a "end" event,
                    // but is piped here in a writable stream which emits a "finish" event.
                    console.log("out.zip written.");
                });
            });
        });
        Log(zip);
        */
        /*
        try {
            fs.copySync(`${dirUserData}/resources/text_en/tags_uimain.txt`, `${Super.GetGrimDawnPath()}/localization/community_russian_bak.rar/tags_uimain.txt`);
            console.log('success!')
          } catch (err) {
            console.error(err)
          }

        let tempData = Super.GetSourceData();
        tempData[`tags_achievements.txt`][1][`TagKey`] = `MyNewKey`;
        Log(tempData);
        Log(Super.GetSourceData());
        Super.GatherTagFiles();
        
       let zip = new AdmZip(`${Super.GetGrimDawnPath()}/localization/community_russian.zip`);
       Log(zip.getEntries());
       Log(zip.getEntry(`tags_uimain.txt`));
       //Log(zip.toBuffer());
       //zip.deleteEntry(`tags_uimain.txt`);
       // ${dirUserData}/resources/text_en/tags_uimain.txt
       //let content = fs.readFileSync(`${dirUserData}/resources/text_en/tags_uimain.txt`, 'utf-8');
       //zip.addFile(`tags_uimain.txt`, Buffer.alloc(content.length, content), "entry comment goes here");
       zip.writeZip(`${Super.GetGrimDawnPath()}/localization/community_russian_bak3.zip`);
       //Log(fs.readFileSync(`${Super.GetGrimDawnPath()}/localization/community_russian.zip/tags_uimain.txt`, 'utf-8'));
       */
    },
    
    sidebarBtns_: function(){
        let outButtons = [];
        
        if(appConfig.get(`GrimDawn.Paths.Game`)){
            outButtons.push({
                "ONCLICK": "_cms.OnClickSaveFilter()",
                "TEXT": "Save Filter"
            });
        }

        return outButtons;
    },
    sidebarList_: function(){
        let OutList = {}
            , LibraryData = Super.GetLibraryData();
        
        for(let libraryIndex in LibraryData){
            OutList[`${LibraryData[libraryIndex].PackageName}`] = {
                text: `${LibraryData[libraryIndex].DisplayName}`
            }
        }
        /*
        for(let kContenType in this.FilterConfig.store){
            mList[kContenType] = [];
        }
        */
        
        return OutList;
    }
    
};
