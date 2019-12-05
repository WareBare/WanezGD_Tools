/**
 * Created by WareBare on 12/05/2019.
 */

const { TMap } = require(`../../lib/WanezProjects/Classes`);

let MapData = {}
    , Paths = {};

module.exports = class SObject{
    
    constructor(InParams)
    {
        this.MapData = {};

        //this.InitializeAllPaths();

        this.Initialize(InParams);

        this.Log(`Initialized Subsystem: ${InParams.SubsystemName || `?`}`);
    }

    Initialize()
    {
        /// ---
    }

    InitializeAllPaths()
    {
        if (this.InitializePath(`GrimDawn_Game`, appConfig.get(`GrimDawn.Paths.Game`))) {
            //this.InitializePath(`GrimDawn_Source`, `${this.GetPath(`GrimDawn_Game`)}/source`);
            this.InitializePath(`GrimDawn_Locale`, `${this.GetPath(`GrimDawn_Game`)}/localization`);
            this.InitializePath(`GrimDawn_Settings`, `${this.GetPath(`GrimDawn_Game`)}/settings`);
        }
        this.InitializePath(`GrimDawn_Working`, dirUserData);
    }
    
    /**
     * console.x messages. (might also add write to file at some point, so use this instead of native console.log(``))
     * @param {string} InMessage Message to output
     * @param {string} InType type of message (Error|Warning) empty for regular log.
     */
    Log(InMessage, InType = `Log`)
    {
        InMessage = `SubsystemLog: ${InMessage}`;
        switch (InType) {
            case `Error`:
                console.error(InMessage);
                break;
            case `Warning`:
                console.warn(InMessage);
                break;
            default:
                console.log(InMessage);
                break;
        }
    }

    SanitizeJSON(InJSONObj)
    {
        let outJSON = InJSONObj
            , stringifiedJSON = JSON.stringify(InJSONObj);

        outJSON = JSON.parse(stringifiedJSON);

        return outJSON;
    }

    InitializePath(InPathKey, InPathValue)
    {
        if (typeof Paths[InPathKey] === `undefined` && InPathValue){
            Paths[InPathKey] = InPathValue.replace(/\\/g, `/`);
        }
        if (typeof Paths[InPathKey] === `undefined`) {
            return false;
        }
        return true;
    }
    SetPath(InPathKey, InPathValue)
    {
        Paths[InPathKey] = InPathValue;
    }
    GetPath(InPathKey)
    {
        if (typeof Paths[InPathKey] === `undefined` || !Paths[InPathKey]){
            this.Log(`Could not find path at key: ${InPathKey}`, `Error`);
            return ``;
        }
        return Paths[InPathKey];
    }
    
    /**
     * Sets data and makes it available to get or update later.
     * @param {string} InDataKey Key to save data at.
     * @param {Arryay|object} InData Data to set as array/object.
     */
    SetData(InDataKey, InData, bInUseGlobalData = true)
    {
        let selectedData = (bInUseGlobalData) ? MapData : this.MapData;

        if (selectedData[InDataKey]) this.Log(`Entry for ${InDataKey} already existed!`);

        selectedData[InDataKey] = new TMap();
        if (Array.isArray(InData)) {
            selectedData[InDataKey].From(InData);
        }else{
            for (const kDataKey in InData) {
                if (InData.hasOwnProperty(kDataKey)) {
                    const elData = InData[kDataKey];

                    selectedData[InDataKey].Add(kDataKey, elData);
                }
            }
        }
    }

    /**
     * Returns data for specified key.
     * @param {string} InDataKey Key to get data from.
     * @param {bool} bInUseGlobalData FALSE will use state.
     */
    GetData(InDataKey, bInUseGlobalData = true)
    {
        let selectedData = (bInUseGlobalData) ? MapData : this.MapData;

        if (typeof selectedData[InDataKey] === `undefined` || !selectedData[InDataKey]){
            this.Log(`Could not find data at key: ${InDataKey}`, `Error`);
            return new TMap();
        }
        return selectedData[InDataKey];
    }
    

    RunArchiveTool(InPaths)
    {
        let archiveMode
            , allSubDirectories = {
                ARZ: [`database`,`gdx1/database`, `gdx2/database`]
                , ARC: [`resources`, `gdx1/resources`, `gdx2/resources`]
            }
            , subDirectories
            , targetDirectory;
        InPaths.forEach(elFileName => {
            if (elFileName.endsWith(`.arc`)){
                archiveMode = `-extract`;
                subDirectories = allSubDirectories.ARC;
                targetDirectory = this.GetPath(`GrimDawn_Working`)
            }
        });
    }

};


