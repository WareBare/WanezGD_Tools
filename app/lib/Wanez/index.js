/**
 * Created by WareBare on 3/24/2017.
 *
 * Wanez Framework/CMS for Electron
 * @author WareBare (Daniel Kamp)
 * @copyright Copyright (c) 2017, WareBare (Daniel Kamp). All rights reserved.
 * @website https://github.com/WareBare
 * @version 0.1
 *
 */

libWZ = {};
tipWZ = require(`./ToolTip.js`);
//tipWZ = new Wz_ToolTip();


module.exports = {
    Core: libWZ.Core = require(`./Core`)
};

//noinspection JSUnresolvedVariable
wzSetArDef = function($opt, $optDefaults){
    $opt = $opt || {};
    $optDefaults = $optDefaults || {};
    for( let $_optIndex in $optDefaults ){
        if(typeof $opt[$_optIndex] === "undefined") $opt[$_optIndex] = $optDefaults[$_optIndex];
    }
    
    return $opt;
};
wzSetArDef2 = function($opt, $optDefaults){
    $opt = $opt || {};
    $optDefaults = $optDefaults || {};
    for( let $_optIndex in $optDefaults ){
        //if(typeof $opt[$_optIndex] === "undefined") {
            if(typeof $optDefaults[$_optIndex] === `string` || typeof $optDefaults[$_optIndex] === `number`){
                $opt[$_optIndex] = $optDefaults[$_optIndex];
            }else{
                $opt[$_optIndex] = wzSetArDef2($opt[$_optIndex],$optDefaults[$_optIndex]);
            }
            
        //}
    }
    
    return $opt;
};

//noinspection JSUnresolvedVariable
wzValidateForm = function($event,$form){
    $event.preventDefault();
    let action = wzCMS(appConfig.get('cms'),$form);
    
    if(Array.isArray(action)){
        // success - load different page
        wzCMS(action[0],action[1]);
    }else if(action){
        // success - reload page
        wzReloadCMS();
    }else{
        console.log('An Error Occurred Submitting the Form!');
    }
    //console.log($form.id);
    // reload page
    
};
//noinspection JSUnresolvedVariable
wzLoadApps = function(){
    /*
     <img src=\"app/img/AssetManager_0000.png\" onclick=\"wzOpenExe('AssetManager')\" /><span class=\"formBTN\" onclick=\"getDBR();\">Load DBR</span><span class=\"formBTN\" onclick=\"wzTest();\">TEST</span><span class=\"formBTN\" onclick=\"wzCMS(['DevDemo','Form']);\">DemoForm</span>
     */
    let el = document.getElementById('App_HeaderApps'),
        tmp = '<img src="app/img/{BTN_NAME}.png" title="{BTN_NAME}.exe" onclick="wzOpenExe(\'{BTN_NAME}\');" />',
        out_ = '';
    
    let aBtn = [
        "AssetManager",
        "Editor",
        "ConversationEditor",
        "Grim Dawn",
        "QuestEditor"
    ];
    
    for( let $_Index in aBtn ){
        out_ += tmp.wzReplace({
            "BTN_NAME": aBtn[$_Index]
        });
    }
    
    el.innerHTML = out_;
};
//noinspection JSUnresolvedVariable
wzOpenExe = function($fileName){
    let child = require('child_process').execFile;
    let executablePath = _wzData.Settings.configGD.getData().Paths.Home+"/"+$fileName+".exe";
    
    child(executablePath, function(err, data) {
        if(err){
            console.error(err);
            return;
        }
        
        console.log(data.toString());
    });
};
//console.log(dirHome);
/**
 *
 * @param {Object} $opt {'search':'replace'}
 * @return {String}
 */
String.prototype.wzReplace = function($opt) {
    let replaceString = this;
    
    for ( let $_Find in $opt ) {
        replaceString = replaceString.replace(new RegExp('\\{'+$_Find+'\\}','g'), $opt[$_Find] );
    }
    return replaceString;
};

String.prototype.wzIncludes = function(InIncludes){
    let bOutSuccess = false;

    if(Array.isArray(InIncludes) && InIncludes.length){
        for(let includeIndex in InIncludes){
            bOutSuccess = this.includes(InIncludes[includeIndex]) || bOutSuccess;
        }
    }

    return bOutSuccess;
};

/**
 * format string templates and generates an output, if no element is set it will just return the resulting string
 * if an element is set it will still return the string and change the element's content to the new string
 *
 * @param {Element|Boolean} $el Element
 * @param {Object} $aRep Replacements
 * @return {String}
 */
String.prototype.wzOut = function($aRep,$el = false){
    //let tmp = this;
    let newStr_ = this.wzReplace($aRep);
    if($el){
        $el.innerHTML = newStr_;
        //console.log(newStr_);
    }
    return newStr_;
};

/**
 * String - Path
 * returns the path without and extension and changes windows \ to /
 * adding a base path will remove the base path from it as well
 *
 * @param InBasePath
 * @return {String}
 */
String.prototype.wzGetFileFromPath = function(InBasePath){
    let NewPath = this;
    NewPath = NewPath.wzNormalizePath().replace(/\.[a-zA-Z]*$/, ``);
    if(InBasePath){
        NewPath = NewPath.replace(InBasePath, ``);
    }
    return NewPath;
};

String.prototype.wzNormalizePath = function(){
    return this.replace(/\\/g,`/`);
};

String.prototype.wzCapitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

wzMerge = function(target,source){
    Object.keys(source).forEach(function($_Key) { target[$_Key] = source[$_Key]; });
    //console.log(target);
    return target;
};

wzIsData = function($inst){
    let ret = false;
    if($inst instanceof libWZ.Core.cData){
        ret = true;
    }
    return ret;
};

wzTest = function(){
    console.log(wzGD_dataSet.getData().stuff);
};

wzGetMapValue = function(InMap, InKeyString){
    let Value = InMap,
        aMapKeys = InKeyString.split(`.`);
    
    try{
        for(let kIndex in aMapKeys){
            Value = Value[aMapKeys[kIndex]];
        }
    }catch(err){
        Value = false;
    }
    
    
    return Value;
};

/**
 * small fn to speed up button creation with an array. Using wzOut($aRep) to parse the template - same tpl for every button
 *
 * usage:
 * tpl.wzGenButtons([$aRep,$aRep,$aRep,...]);
 *
 * @param {Array} $aButtons
 * @return {string}
 */
String.prototype.wzParseTPL = function($aButtons){
    let btns_ = '';
    for( let $_Index in $aButtons ){
        if($aButtons[$_Index].TEXT) btns_ += this.wzOut($aButtons[$_Index]);
    }
    return btns_;
};

wzOpenModFile = function(InFilePath){
    //WZ.GrimDawn.tFn.getPaths().Source
    //Log(`${appConfig.get(`GrimDawn.Paths.Mods`)[appConfig.get(`GrimDawn.activeMod`)]}`);
    // C:\Program Files (x86)\Steam\steamapps\common\Grim Dawn\database\records\game
    child_process.exec(`"${appConfig.get(`GrimDawn.Paths.Game`)}/DBREditor.exe" "${appConfig.get(`GrimDawn.Paths.Working`)}" "${appConfig.get(`GrimDawn.Paths.Game`)}" "${appConfig.get(`GrimDawn.Paths.Mods`)[appConfig.get(`GrimDawn.activeMod`)]}" "${WZ.GrimDawn.tFn.getPaths().Mod}/${InFilePath}"`, function(err, data) {
        if(err){
            wzNotify.err(`File does not exists, make sure the file in question is in your Mod!`, `File not found!`);
            console.error(err);
            return;
        }
    });
};
