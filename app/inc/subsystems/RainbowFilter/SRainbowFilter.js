/**
 * Created by WareBare on 12/05/2019.
 */

const Parent = require(`../SObject`);

module.exports = class SRainbowFilter extends Parent{
    
    constructor(InParams){
        super(InParams);
    }

    Initialize()
    {
        super.Initialize();

        
    }


    
    FindAndUpdateSourceEntry(OutSourceData, InFileName, InKeyToFind, InValueReplace)
    {
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
    }

    UpdateSourceTag(OutSourceData, InKeyToFind, InTagValue, bInUpdateDef = false)
    {
        let tempIndex, bUpdated = false;

        if(bInUpdateDef){
            // check if updated before, only update if it wasn't before, no need to do it twice.
            //console.log(OutSourceData[`language.def`]);
            if(OutSourceData[`language.def`] && OutSourceData[`language.def`][0] && !OutSourceData[`language.def`][0].bUpdated){
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
    }

    FetchColorFromGroup(InLibraryGroupEntry)
    {
        // Uses either Library ColorCode (if set) or Group Color Code (as default).
        return InLibraryGroupEntry.ColorCode || this.GroupData[InLibraryGroupEntry.GroupName].ColorCode;
    }

    /**
     * Checks if Group has a match for Tag Keyword.
     * @param {string} InGroupName name of the group to check in GroupData
     * @param {string} InKeywordKey key for Keywords (like Type, Classification, Group)
     * @param {string} InKeywordCheck The Keyword to look for (like MI or Regular Item)
     */
    DoesGroupMatchKeywords(InGroupName, InKeywordKey, InKeywordCheck)
    {
        // #DECLARATION
        let bOutMatch = false;

        // #VALIDATION
        if(!this.GroupData[InGroupName]) return (InKeywordKey === `Type`) ? false : true;
        if(!this.GroupData[InGroupName].Keywords[InKeywordKey]) return (InKeywordKey === `Type`) ? false : true;

        // #LOGIC
        bOutMatch = this.GroupData[InGroupName].Keywords[InKeywordKey].includes(InKeywordCheck[InKeywordKey]);

        return bOutMatch;
    }

    FetchColorCodeForTag(InGroupKeywords)
    {
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
    }

    IsSymbolDisabledByLibrary(InKeywords, InKeywordGroupName)
    {
        let bIsDisabled = false;

        if(this.LibraryData.DisabledSymbols){
            // #WiP
            if(this.LibraryData.DisabledSymbols.includes(`${InKeywordGroupName}.${InKeywords[InKeywordGroupName]}`)){
                bIsDisabled = true;
            }
        }

        return bIsDisabled;
    }

    ApplyColorInSourceData(OutSourceData, InFileName, InIndex, InColorCode, InKeywords)
    {
        const tagName = OutSourceData[InFileName][InIndex].TagKey
            , specialGroupName = this.SpecialTags.Tags[tagName]
            , masteryColor = this.SpecialTags.Masteries[InKeywords.Group];

        let CustomPrefix = ``
            , CustomSuffix = ``;
        
        if (specialGroupName) {
            const groupObject = this.SpecialTags.Groups[specialGroupName];
            //Log(groupObject);
            CustomPrefix = groupObject.Symbol;
            
            // only change param color code if it is not set to 'Clear'
            InColorCode = (!groupObject.ColorCode || groupObject.ColorCode === `Clear`) ? InColorCode : groupObject.ColorCode;
        }
        InColorCode = InColorCode || masteryColor || `Clear`;

        if (CustomPrefix === ``) {
            if (!this.IsSymbolDisabledByLibrary(InKeywords, `Type`)) {
                CustomPrefix += Super.MakeSymbol(`Type`, InKeywords);
            }
            if (!this.IsSymbolDisabledByLibrary(InKeywords, `Classification`)) {
                CustomPrefix += Super.MakeSymbol(`Classification`, InKeywords);
            }
            if (!this.IsSymbolDisabledByLibrary(InKeywords, `Group`)) {
                CustomPrefix += Super.MakeSymbol(`Group`, InKeywords);
            }
        }

        if (CustomSuffix === ``) {
            if (InKeywords.Type === `Skill` && InKeywords.Classification === `Mastery`) {
                if (appConfig.get(`Filter.bEnableClassNames`)) CustomSuffix = ` (${Super.GetMasteryNames()[InKeywords.Group]})`;
            }
        }
        
        const bHasNoColor = (InColorCode === `Clear` || !InColorCode);
        const bHasNoPrefix = CustomPrefix === ``;
        const bHasNoSuffix = CustomSuffix === ``;
        if( bHasNoColor && bHasNoPrefix && bHasNoSuffix ) return false;

        let newValue = OutSourceData[InFileName][InIndex].TagValue
            , colorCode = `${CustomPrefix}${(InColorCode !== `Clear`) ? `{^${InColorCode.toUpperCase()}}` : ``}`;
        
        if (this.bPolish && tagName.includes(`Prefix`)) {
            //console.log(`is Polish`);
            newValue = `$${newValue}`;
        }

        if(newValue.includes(`{^E}`)){
            newValue = `${newValue.replace(`{^E}`, `${colorCode}`)}{^E}`;
        }else if(newValue.match(/{\^[A-Za-z]}/g)){
            newValue = newValue.replace(/{\^[A-Za-z]}/g, colorCode);
        }else if(newValue.startsWith(`[`) || newValue.startsWith(`\$[`)){
            newValue = newValue.replace(/(\[[a-zA-Z]+])/g, `$1${colorCode}`);
            //Log(newValue);
        }else if(newValue.startsWith(`\$`)){
            newValue = newValue.replace(`$`, `$${colorCode}`);
        }else if(newValue.match(RegexGlobalLetters)){
            newValue = `${colorCode}${newValue}`;
            //Log(newValue);
        }
        if(OutSourceData[InFileName][InIndex].TagKey.includes(`Conversion`)){
            newValue += `{^E}`;
            //Log(newValue);
        }
        if (CustomSuffix !== ``) {
            newValue += `${CustomSuffix}`;
        }

        if(OutSourceData[InFileName][InIndex].TagValue !== newValue){
            OutSourceData[InFileName][0].bUpdated = true;
            OutSourceData[InFileName][InIndex].TagValue = newValue;
        }else{
            Log(OutSourceData[InFileName][InIndex].TagValue);
        }
    }

    FindTagAndApplyColorInSourceData(OutSourceData, InTagKey, InColorCode, InKeywords)
    {
        let bFoundEntry = false
            , foundIndex = -1
            , fileName;
            
        // loop files with previous changes, ignore others.
        for(let fileKey in OutSourceData){
            if(OutSourceData[fileKey][0].bUpdated && foundIndex === -1){
                foundIndex = OutSourceData[fileKey].findIndex( x => x.TagKey === InTagKey );
                if(foundIndex !== -1) this.ApplyColorInSourceData(OutSourceData, fileKey, foundIndex, InColorCode, InKeywords);
                // #BugFix - Russian Localization
                if(fileKey === `tags_gmreplacer.txt` && foundIndex !== -1){
                    foundIndex = -1;
                }
            }
        }
        
        // loop files without previous changes if no entry found yet.
        if(foundIndex === -1){
            for(let fileKey in OutSourceData){
                if(!OutSourceData[fileKey][0].bUpdated && foundIndex === -1){
                    foundIndex = OutSourceData[fileKey].findIndex( x => x.TagKey === InTagKey );
                    if(foundIndex !== -1) this.ApplyColorInSourceData(OutSourceData, fileKey, foundIndex, InColorCode, InKeywords);
                    // #BugFix - Russian Localization
                    if(fileKey === `tags_gmreplacer.txt` && foundIndex !== -1){
                        foundIndex = -1;
                    }
                }
            }
        }

    }

    UpdateSourceData(OutSourceData)
    {
        let outNewSourceData = OutSourceData
            , tagInfoData = Super.GetClassData(`TagInfoData`);
        
        for(let tagKey in tagInfoData){
            // Applies color to tag inside sourceData and gets the colorCode for tag from group
            this.FindTagAndApplyColorInSourceData(OutSourceData, tagKey, this.FetchColorCodeForTag(tagInfoData[tagKey]), tagInfoData[tagKey]);
        }

        return outNewSourceData;
    }


    OnWriteColors(InSourceData, InGroupData, InImportantData)
    {
        //this.GroupData = this.SanitizeJSON(Super.GetClassData(`GroupData`, false));
        this.GroupData = InGroupData;
        //Log(Super.GetClassData(`GroupData`, false));

        //this.SourceData = Super.GetSourceData();
        this.SourceData = InSourceData;

        //this.SpecialTags = Super.GetClassData(`ImportantTags`);
        this.SpecialTags = InImportantData;
        this.SpecialTags.Groups = this.SpecialTags.Groups || {};
        this.SpecialTags.Tags = this.SpecialTags.Tags || {};
        this.SpecialTags.Masteries = this.SpecialTags.Masteries || {};

        // this.contentType
        this.ColorLibrary = appConfig.get(`GrimDawn.ColorLibrary`);
        Super.ReadData(this.LibraryData = {}, `LibraryData`, `PackageName`, `${this.ColorLibrary}`);

        let savePath
        //let SourceData = this.SourceData;
        let SourceData = InSourceData;

        console.info(`===== START =====`);
        console.log(this.GroupData);
        console.log(this.SpecialTags);
        console.log(this.LibraryData);
        console.log(SourceData);
        console.info(`===== END =====`);
        
        const versioningBaseTextIndex = SourceData[`tags_ui.txt`].findIndex( el => el[`TagKey`] === `tagHUD_LootModeDescription` )
            , versioningBaseText = SourceData[`tags_ui.txt`][versioningBaseTextIndex].TagValue
            , versioningCustomText = `{^n}{^n}Rainbow Files Created with{^n}Rainbow Tool: v${app.getVersion()}{^n}for Grim Dawn: v${Super.GrimDawnVersion}{^n}{^o}An outdated version may cause issues in form of "Tag not found:...".`;
        
        //Log( `${versioningBaseText}${versioningCustomText}` );
        this.bPolish = false;
        if (Super.IsUsingLocale()) {
            if(SourceData[`language.def`] && SourceData[`language.def`][1] && SourceData[`language.def`][1].TagValue === `Polski`){
                this.bPolish = true;
            }
        }
        this.UpdateSourceData(SourceData);
        
        SourceData[`tags_ui.txt`].splice(1, 0, {
            TagKey: `tagHUD_LootModeDescription`
            , TagValue: `${versioningBaseText}${versioningCustomText}`
        });

        if(Super.IsUsingLocale()){
            let zip = new JSZip();
            savePath = `${Super.GetGrimDawnPath()}/localization`;

            //SourceData[`language.def`][SourceData[`language.def`].find(  )] // [C]
            this.UpdateSourceTag(SourceData, `language`, `[C] {VALUE} ${this.ColorLibrary}`, true);
            if(appConfig.get(`Filter.bZipChanges`)){
                // Save Filter as .zip using Locale in /localization/*.zip
                let zipSuffix = `_${this.ColorLibrary}_C_`;
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
                            //wzNotify.save(`${appConfig.get(`Filter.LocaleFileName`).replace(`.zip`, `${zipSuffix}.zip`)}`);
                            //console.log("out.zip written.");
                            
                            //wzUpdateHeader(`Saved: ${appConfig.get(`Filter.LocaleFileName`).replace(`.zip`, `${zipSuffix}.zip`)}`);
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
                , zipName = `${this.ColorLibrary}-${(this.LibraryData.Version !== ``) ? this.LibraryData.Version : Super.GrimDawnVersion}.zip`;
            
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
                    //wzNotify.save(`settings/${zipName}`);
                    //console.log("out.zip written.");
                    //wzUpdateHeader(`Saved: ${zipName}`);
                });
            }
        }
    }
    
};
