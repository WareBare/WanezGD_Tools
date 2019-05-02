/**
 * Created by Ware on 7/28/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cMain extends libWZ.Core.cBase{
    
    /**
     *
     * @param $opt
     *
     * Config (str): config File to load from
     * Parent (str): available functionality - class to inherit from
     *
     */
    constructor($opt = {}){
        super();
        
        this.iOpt = Object.assign({
            Config: false,
            Parent: `cBase`
        },$opt);
        
        if(this.iOpt.Config) this.iConfig = new eConfig({name: this.iOpt.Config});
        this.iClass = new libWZ.Nodes[this.iOpt.Parent](this.iConfig);
        
        this.aNodes = [];
        this.out_ = ``;
        
        this.nodeLayout = {
            Frame: `<div id="WzNodeEditor" oncontextmenu="console.log('show menu')">{NODES}</div>`,
            Node: `<div>{NAME}</div>`
        };
        
        this.iniOutput();
    }
    
    /**
     * collect all information and call methods for the output
     */
    iniOutput(){
        this.out_ = this.nodeLayout.Frame.wzReplace({NODES: `Loading...`});
        
        this.iClass[`WriteConsoleText`](`This is Working!`);
        let tempEntry;
        for(let $_ID in this.iClass.nData){
            tempEntry = this.iClass.nData[$_ID];
            
            this.aNodes.push(this.iClass[tempEntry.Node](tempEntry.Title, tempEntry.Output, tempEntry.Input));
        }
        console.log(this.aNodes);
    }
    
    /**
     * primary method to call to display the NodeEditor-Grid
     */
    __getOutput(){
        let Nodes_ = ``;
        
        
        //this.out_ = this.nodeLayout.Frame.wzReplace({NODES: `initialized!`});
        
        return this.out_;
    }
    
    generateNodes(){
        this.iClass.isEditor = false;
        let tempEntry;
        for(let $_ID in this.iClass.nData){
            tempEntry = this.iClass.nData[$_ID];
        
            this.aNodes.push(this.iClass[tempEntry.Node](tempEntry.Title, tempEntry.Output, tempEntry.Input));
        }
        this.iClass.isEditor = true;
    
    }
    
    
};
