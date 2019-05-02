/**
 * Created by Ware on 7/28/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cBase{
    
    constructor(){
        this.isEditor = true;
        this.nDataDefaults = {
            Node: `WriteConsoleText`,
            Title: false,
            Output: {},
            Input: {}
        };
        this.nData = [];
        //this.ConsoleText;
        this.ini();
    }
    
    ini(){
        //
    }
    
    WriteConsoleText($text){
        if(this.isEditor){
            console.log(`EditorMode`);
        }else{
            console.log($text);
        }
    }
    
};
