/**
 * Useful Grim Dawn functions.
 * - Blacksmith maker, etc
 */
const Parsers = require(`../Parsers.js`);
const { TMap, TDbrArray } = require(`../../Classes`);
const { Tag, PerformTagGathering, GetTags, FindTag, UpdateTag, AddTagsToFile, SaveTags } = require(`./Tags`);

/**
 * FileName => ex: "enemy.lua"
 * 
 * HookName => name of the function, also used inside the dbr
 * 
 * HookText => output of function
 * 
 * { `{FileName}`: TMap[ { Key: `{HookName}`, Value: `{HookText}` } ] }
 */
let LuaHooks = {};
let FactionData = new TMap();

/**
 * Makes FactionData used on Init() to generate all required data.
 * They are added to dbrData and won't be saved
 */
const MakeFactionData = function(){
    let factions = Parsers.AppendDbrFolder(
        [
            `/records/controllers/factions`
            , `/mod_wanez/controllers/factions`
        ], {
            bCheckModFirst: true
            , bReturnFullDbrInfo: true
    });

    factions.ForEach( (It) => {
        FactionData.Add(It.RelativeFilePath.replace(/^\//, ``), {
            Name: It.Data.Find(`myFaction`)
            , Icon: It.Data.Find(`factionIcon`)
        });
    });
}



/**
 * Get Faction Data.
 * @param {string} InFactionDbrPath relative path of faction .dbr
 */
const GetFactionData = function(InFactionDbrPath){
    let outData;

    outData = FactionData;
    // #ToTest MakeFactionData
    if(InFactionDbrPath && InFactionDbrPath !== ``) outData = FactionData.Find(InFactionDbrPath);
    //Log(outData);

    return outData;
}

/**
 * Checks for existing LuaHooks
 * @param {TMap} OutDbrData data to check for hook in and update.
 * @param {Object} InHookData all information needed to update a hook.
 * @param {string} InHookData.FileName file saved in /hooks/ with lua extension
 * @param {Object} InHookData.Hook hook function name and args
 * @param {string} InHookData.Hook.Name function name
 * @param {Array} InHookData.Hook.Args args often just InObjectId
 * @param {[{}]} InHookData.Calls Array of objects like 'Hook', but for calls inside the hook.
 * @param {Object} InHookData.ReplacersByDbr 
 * @param {string} InHookData.ReplacersByDbr.X FACTION: 'factions' - value is dbr field.
 * @param {{}} InHookData.Replacements using wzReplace in the resulting string to finish up.
 * 
 * @returns {TMap|boolean} resulting hooks as TMap.
 */
const UpdateHook = function(OutDbrData, InHookData){
    let hookValues = Object.assign({
        Replacements: {}
        , Calls: []
    }, JSON.parse(JSON.stringify(InHookData.Value)) )
        , hookStr = ``
        , hookName = ``
        , tempArgs = ``
        , loopPtrData
        , DbrFindFunctionPtr = {
            'factions': GetFactionData
        }
        , currentHook = OutDbrData.Find(InHookData.Key);

    LuaHooks[hookValues.FileName] = LuaHooks[hookValues.FileName] || new TMap();

    // Check if hook exists, if so add it to hookData.
    if(typeof currentHook !== `undefined`){
        hookValues.Calls.push({
            Name: currentHook
            , Args: [`InObjectId`]
        });
        //hookValues.Replacements[`SCRIPT_NAME`] = ``;
        hookValues.Hook.Name = `${hookValues.Hook.Name.replace(/\{[A-Z]+\}/g, ``)}${currentHook.replace(/\./g, `_`)}`
    }

    // Make 'Replacements' ready for use.
    if(hookValues.ReplacersByDbr){
        for(let replacerKey in hookValues.ReplacersByDbr){
            if(DbrFindFunctionPtr[hookValues.ReplacersByDbr[replacerKey]]){
                // define data from FnPtr (using dbrValue as ptrKey to find FnPtr and Find(dbrValue) as ptrArg).
                loopPtrData = DbrFindFunctionPtr[hookValues.ReplacersByDbr[replacerKey]]( OutDbrData.Find(hookValues.ReplacersByDbr[replacerKey]) );
                // resulting data will always be .Value.Text (for factions the tag value of the factions is saved in .Value.Text)
                hookValues.Replacements[replacerKey] = (typeof loopPtrData === `undefined`) ? `` : loopPtrData.Name;
                //Log( OutDbrData.Find(hookValues.ReplacersByDbr[replacerKey]) );
            }else{
                hookValues.Replacements[replacerKey] = OutDbrData.Find(hookValues.ReplacersByDbr[replacerKey]);
            }
            
        }
    }

    // Make hookStr.
    for(let i = 0; i < hookValues.Hook.Args.length; i++){
        if(tempArgs !== ``) tempArgs += `, `; 
        tempArgs += `${hookValues.Hook.Args[i]}`;
    }
    hookStr += `${hookValues.Hook.Name} = function(${tempArgs})`;
    for(let i = hookValues.Calls.length - 1; i >= 0; i--){
        tempArgs = ``;
        for(let j = 0; j < hookValues.Calls[i].Args.length; j++){
            if(tempArgs !== ``) tempArgs += `, `;
            tempArgs += `${hookValues.Calls[i].Args[j]}`;
        }
        hookStr += `\r\n\t${hookValues.Calls[i].Name}(${tempArgs})`;
    }
    hookStr += `\r\nend`;
    
    // Use 'Replacements' on hookStr and update field.
    hookStr = hookStr.wzReplace(hookValues.Replacements);
    hookName = hookValues.Hook.Name.wzReplace(hookValues.Replacements);
    //if(hookValues.Calls.length >= 2) Log(hookStr);
    OutDbrData.Add(InHookData.Key, hookName);

    // Add to LuaHooks Data, which will be saved later.
    LuaHooks[hookValues.FileName].Add(hookName, hookStr);
}

/**
 * Updates Dbr entry, checks for existing lua hooks and makes tags.
 * @param {TMap} OutDbrData data to update
 * @param {TMap} InNewData new data for updating
 * 
 * @returns {string|Array} value before adding the new one. Or undefined if none existed.
 */
const UpdateDbr = function(OutDbrData, InNewData){
    let outOldValue;
    //Log(InDbrData);
    //Log(InNewData);
    InNewData.ForEach( (It) => {
        if(typeof It.Value === `string` || Array.isArray(It.Value)){
            //Log(`IsDefault: ${It.Key}`);
            outOldValue = OutDbrData.Add(It.Key, It.Value, true, true);
        }else{
            //Log(`IsSpecial: ${It.Key}`);
            if(It.Value.FileName.endsWith(`.lua`)){
                UpdateHook(OutDbrData, It);
            }
        }
    });
    //Log(LuaHooks);
    return outOldValue;
}


/**
 * 
 * @param {string} InRelativePath where to save the blueprint, BasicBlueprint is used.
 * @param {Object} InOptions 
 * @param {{}} InOptions.Evaliables Replacements for equations.
 * @param {string} InOptions.CostEquation using eval() and wzReplace(.Evaliables) .
 * @param {Array} InOptions.Reagents Reagents as array [Name,Cost].
 * @param {string} InOptions.ResultRecord Item player gets as a result (can be randomizer).
 * @param {string} InOptions.ResultPreview Item the player can see as, not the item resulting.
 */
const MakeBlueprint = function(InRelativePath, InOptions){
    
    let defaultMap = new TMap();
    if(InOptions.FileDescription) defaultMap.Add(`FileDescription`, InOptions.FileDescription);

    defaultMap.Add(`artifactName`, InOptions.ResultRecord);
    if(InOptions.ResultPreview) defaultMap.Add(`forcedRandomArtifactName`, InOptions.ResultPreview);
    defaultMap.Add(`artifactCreationCost`, InOptions.CostEquation.wzReplace(InOptions.Evaliables));

    //let EquationTest = eval( InOptions.Reagents[0][1].wzReplace(InOptions.Variables) );
    for(let i = 0; i < InOptions.Reagents.length; i++){
        defaultMap.Add(`reagent${i ? i : `Base`}BaseName`, InOptions.Reagents[i][0]);
        defaultMap.Add(`reagent${i ? i : `Base`}Quantity`, eval( InOptions.Reagents[i][1].wzReplace(InOptions.Evaliables) ));
    }


    Parsers.AddParsedDbr(`/${InRelativePath}`, Parsers.UseDefaultDbr(`BasicBlueprint`, defaultMap));
}

const EPresets = {
    CharacterLootMisc: {
        LoopCount: 6
        , KeyPattern: `{KEY}{CONSTANT}{INDEX}`
        , KeyVariants: [`chanceToEquip`, `loot`]
        , GlobalMap: new TMap([
            [`chanceToEquipMisc1`, `0.00`]
            , [`chanceToEquipMisc2`, `0.00`]
            , [`chanceToEquipMisc3`, `0.00`]
        ])
        , Data: {
            'Misc1Item': false
            , 'Misc2Item': false
            , 'Misc3Item': false
        }
    }
    , CharacterLootFull: {
        LoopCount: 6
        , KeyPattern: `{KEY}{CONSTANT}{INDEX}`
        , KeyVariants: [`chanceToEquip`, `loot`]
        , GlobalMap: new TMap([
            [`chanceToEquipMisc1`, `0.00`]
            , [`chanceToEquipMisc2`, `0.00`]
            , [`chanceToEquipMisc3`, `0.00`]
            , [`chanceToEquipHead`, `0.00`]
            , [`chanceToEquipChest`, `0.00`]
            , [`chanceToEquipShoulders`, `0.00`]
            , [`chanceToEquipHands`, `0.00`]
            , [`chanceToEquipLegs`, `0.00`]
            , [`chanceToEquipFeet`, `0.00`]
            , [`chanceToEquipRightHand`, `0.00`]
            , [`chanceToEquipLeftHand`, `0.00`]
            , [`chanceToEquipFinger1`, `0.00`]
            , [`chanceToEquipFinger2`, `0.00`]
        ])
        , Data: {
            'Misc1Item': false
            , 'Misc2Item': false
            , 'Misc3Item': false
            , 'HeadItem': false
            , 'ChestItem': false
            , 'ShouldersItem': false
            , 'HandsItem': false
            , 'LegsItem': false
            , 'FeetItem': false
            , 'RightHandItem': false
            , 'LeftHandItem': false
            , 'Finger1Item': false
            , 'Finger2Item': false
        }
    }
    , ChestLoot: {
        LoopCount: 6
        , KeyPattern: `{CONSTANT}{KEY}{INDEX}`
        , KeyVariants: [`Name`, `Weight`]
        , GlobalMap: false
        , Data: {
            'loot1': false
            , 'loot2': false
            , 'loot3': false
            , 'loot4': false
            , 'loot5': false
            , 'loot6': false
        }
    }
    , MasterTableItems: {
        LoopCount: 60
        , KeyPattern: `{CONSTANT}{KEY}{INDEX}`
        , KeyVariants: [`Name`, `Weight`]
        , GlobalMap: false
        , Data: {
            'loot': false
        }
    }
    , TdynItems: {
        LoopCount: 30
        , KeyPattern: `{CONSTANT}{KEY}{INDEX}`
        , KeyVariants: [`Name`, `Weight`]
        , GlobalMap: false
        , Data: {
            'loot': false
        }
    }
    , TdynAffixes: {
        LoopCount: 30
        , KeyPattern: `{CONSTANT}{KEY}{INDEX}`
        , KeyVariants: [`Name`, `LevelMin`, `LevelMax`, `Weight`]
        , GlobalMap: false
        , Data: {
            'prefixTable': false
            , 'suffixTable': false
            , 'rarePrefixTable': false
            , 'rareSuffixTable': false
        }
    }
    , SkillTree: {
        LoopCount: 99
        , KeyPattern: `{CONSTANT}{KEY}{INDEX}`
        , KeyVariants: [`Name`, `Level`]
        , GlobalMap: false
        , Data: {
            'skill': false
        }
    }
}

/**
 * `ConstantKey` ex: loot -> the string that is always the same.
 * @param {TMap} OutDbrData 
 * @param {Object} InEPreset InOptions preset, overrides defaults, but will be overridden by InOptions.
 * @param {Object} InOptions 
 * @param {number} InOptions.LoopCount 
 * @param {boolean} InOptions.bEmptyWhenFalse when data is false value is set to ``, if FALSE data is not changed only returned.
 * @param {string} InOptions.KeyPattern [default: `{CONSTANT}{KEY}{INDEX}`]
 * @param {Array} InOptions.KeyVariants containing strings for Pattern: KEY
 * @param {TMap} InOptions.GlobalMap ex: [{Key: `{chanceToEquipMisc1}`, Value: `int {80}`}]
 * @param {Object} InOptions.Data 
 * @param {Array} InOptions.Data.ConstantKey FALSE will empty matching entries. Index + 1 === LoopCount (i)
 * @param {string|number} InOptions.Data.ConstantKey.Values Value (Index) === (Index) InOptions.KeyVariants
 * 
 * @returns {TMap} old Values.
 */
const UpdateDbrArray = function(OutDbrData, InEPreset, InOptions = {}){
    InOptions = Object.assign({
        LoopCount: 20
        , bEmptyWhenFalse: true
        , KeyPattern: `{CONSTANT}{KEY}{INDEX}`
        , KeyVariants: []
        , GlobalMap: false
        , Data: {}
    }, InEPreset, InOptions);

    let outPreviousValues = new TMap()
        , loopKey
        , loopValue;


    if(InOptions.GlobalMap) OutDbrData.Append(InOptions.GlobalMap);

    // loop ConstantKey in Data - CONSTANT [ex: `Misc1Item`]
    for(let constantKey in InOptions.Data){
        // loop through LoopCount - INDEX
        for(let i = 1; i < InOptions.LoopCount; i++){
            // loop KeyVariants - KEY [ex: `chanceToEquip`, `loot`]
            for(let j = 0; j < InOptions.KeyVariants.length; j++){
                // #WiP
                loopKey = InOptions.KeyPattern.wzReplace({
                    CONSTANT: constantKey
                    , KEY: InOptions.KeyVariants[j]
                    , INDEX: i
                });
                //Log(loopKey);
                if(!InOptions.bEmptyWhenFalse && !InOptions.Data[constantKey]){
                    // only return old value, no updates to the dbr.
                    loopValue = OutDbrData.Find(loopKey);
                    if(typeof loopValue !== `undefined`) outPreviousValues.Add(loopKey, loopValue);
                }else{
                    // if Data false, Empty data for this dbrArray, if not use new value to update.
                    loopValue = ``;
                    if(InOptions.Data[constantKey]) loopValue = (InOptions.Data[constantKey][i - 1]) ? InOptions.Data[constantKey][i - 1][j] : ``;
                    // new value, if not undefined add to outPreviousValues
                    loopValue = OutDbrData.Add(loopKey, loopValue, true);
                    if(typeof loopValue !== `undefined`) outPreviousValues.Add(loopKey, loopValue);
                }
                
            }
        }
    }

    return outPreviousValues;
}



const SaveLuaHooks = function(){
    let loopStr = ``;
    
    for(let hookFileName in LuaHooks){
        loopStr = ``;
        LuaHooks[hookFileName].ForEach( (It) => {
            // ---
            //Log(It);
            loopStr += `\r\n`;
            loopStr += It.Value;
            loopStr += `\r\n`;
        });
        
        fs.outputFile(`${Parsers.GetPathGrimDawn(Parsers.EPathEnum.ModLua)}/hooks/${hookFileName}`, loopStr, 'utf8', function(err) {
            if(err) {
                console.error(err);
            } else {
                //wzNotify.save(`${$filepath.replace($removeFromPath,``)}`);
                console.info(`File Saved: ${hookFileName}`);
            }
        });
    }
}

module.exports = {

    UpdateDbr,
    EPresets,
    UpdateDbrArray,

    Tag,
    PerformTagGathering,
    GetTags,
    FindTag,
    UpdateTag,
    AddTagsToFile,

    SaveLuaHooks,
    SaveTags,

    MakeFactionData,
    GetFactionData,

    MakeBlueprint

}
