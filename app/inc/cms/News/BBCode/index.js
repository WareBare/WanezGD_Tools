/**
 * Created by WareBare on 4/28/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    Forms:{},
    tplContent: {},
    
    html: `# Header 1 #
with some text,

## Header 2 ##
* with a list
* changes
 * are
 * saved
 * to clipboard
* end
 * of demo


### Header 3 ###

#### Header 4 ####`,
    _md: false,
    mdSettings: {
        h1: {
        
        },
        h2: {
            //underline: true,
            //color: `silver`
        },
        h3: {
            //underline: true,
            //color: `green`
        },
        h4: {
            //underline: true,
            //color: `green`
        }
    },
    
    copyBBCodeToCB(){
        clipboard.writeText(this._md.bbcode, 'bbcode');
    },
    
    saveCurrentMarkdown: function(){
        this._md.saveMarkdown();
        this.contentType = document.getElementById(`mdSaveName`).value;
        wzCMS(appConfig.get('cms'));
    },
    updateCurrentMarkdown: function(){
        if(this.contentType){
            this._md.saveMarkdown(this.contentType);
            this.contentType = document.getElementById(`mdSaveName`).value;
            wzCMS(appConfig.get('cms'));
        }else{
            wzNotify.err(`You need to load a text before you can update one`);
        }
    },
    deleteCurrentMarkdown: function(){
        if(this.contentType){
            this._md.deleteMarkdown(this.contentType);
            this.contentType = false;
            wzCMS(appConfig.get('cms'));
        }else{
            wzNotify.err(`You need to load a text before you can delete it`);
        }
    },
    
    changeColor: function($newColor, $type){
        //console.log($type);
        this.mdSettings[$type].color = $newColor;
        //console.log(this.mdSettings);
        this._md.updateMarkdown(false,this.mdSettings);
        this.refreshContents();
    },
    changeStyle: function($newStyle, $type){
        //console.log($type);
        this.mdSettings[$type][$newStyle] = !this.mdSettings[$type][$newStyle];
        //console.log(this.mdSettings);
        this._md.updateMarkdown(false,this.mdSettings);
        this.refreshContents();
    },
    
    refreshContents: function(){
        let elOutput = document.getElementById(`mdHTML`);
        //console.log(this._md.html);
        elOutput.innerHTML = this._md.html;
    },
    
    parseMd: function($el){
        /*
        if(e.ctrlKey || e.ctrlKey && e.keycode === `67` || e.ctrlKey && e.keycode === `86` || e.ctrlKey && e.keycode === `65`){
            //  && e.keycode === `67`
        }else{
        
        }
        */
        //let _md = new WZ.Core.cMarkdown($el.value);
        this._md.updateMarkdown($el.value,this.mdSettings);
    
        //this.html = this._md.html;
    
        //wzCMS(appConfig.get('cms'));
        this.refreshContents();
        /*
        setTimeout(() => {
            _cms.refreshContents();
        },50);
        */
    },
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = `Markdown to BBCode converter <br /> <span style="color:lightcoral;">If you want to start a new text you need to save the old one under a new title, or you will overwrite the text under that title! Because changes to texts are saved immediately.</span>`,
            basicColor = ``,
            basicStyle = ``,
            aOptions = [`black`,`sienna`,`darkolivegreen`,`darkgreen`,`darkslateblue`,`navy`,`indigo`,`darkslategray`,`darkred`,`darkorange`,`olive`,`green`,`teal`,`blue`,`slategray`,`dimgray`,`red`,`sandybrown`,`yellowgreen`,`seagreen`,`mediumturquoise`,`royalblue`,`purple`,`gray`,`magenta`,`orange`,`yellow`,`lime`,`cyan`,`deepskyblue`,`darkorchid`,`silver`,`pink`,`wheat`,`lemonchiffon`,`palegreen`,`paleturquoise`,`lightblue`,`plum`,`white`];
    
        this._md = new WZ.Core.cMarkdown(this.html);
        if(this.contentType) {
            this._md.loadMarkdown(this.contentType);
            this.mdSettings = this._md.iSettings;
        }
    
        for(let $_Index in aOptions){
            basicColor += `<span style="background-color:${aOptions[$_Index]};" onClick="_cms.changeColor('${aOptions[$_Index]}','{TYPE}')"></span>`;
        }
        basicStyle += `<span style="text-decoration: underline;" onClick="_cms.changeStyle('underline','{TYPE}')">U</span>`;
        basicStyle += `<span style="font-weight: bold;" onClick="_cms.changeStyle('bold','{TYPE}')">B</span>`;
        basicStyle += `<span style="font-style: italic;" onClick="_cms.changeStyle('italic','{TYPE}')">I</span>`;
        
        out_ += `<div>Header 1: ${basicStyle.replace(/\{TYPE\}/g,`h1`)} <div class="colorPicker">${basicColor.replace(/\{TYPE\}/g,`h1`)}</div></div>`;
        out_ += `<div>Header 2: ${basicStyle.replace(/\{TYPE\}/g,`h2`)} <div class="colorPicker">${basicColor.replace(/\{TYPE\}/g,`h2`)}</div></div>`;
        out_ += `<div>Header 3: ${basicStyle.replace(/\{TYPE\}/g,`h3`)} <div class="colorPicker">${basicColor.replace(/\{TYPE\}/g,`h3`)}</div></div>`;
        out_ += `<div>Header 4: ${basicStyle.replace(/\{TYPE\}/g,`h4`)} <div class="colorPicker">${basicColor.replace(/\{TYPE\}/g,`h4`)}</div></div>`;
        out_ += `<div><label>Title: <input id="mdSaveName" value="${this.contentType || ``}"></label></div>`;
        out_ += `<div id="mdInput"><textarea onChange="_cms.parseMd(this);_cms.updateCurrentMarkdown();" onkeyup="_cms.parseMd(this);">${this._md.iMarkdown}</textarea></div>`; //
        out_ += `<div id="mdHTML" class="md">${this._md.html}</div>`;
        
        //clipboard.writeText(this._md.bbcode, 'bbcode');
        
        return out_;
    },
    
    sidebarBtns_: function(){
        let canUpdate = false,
            canDelete = false,
            canCopy = false;
        
        if(this.contentType){
            canUpdate = {
                "ONCLICK": "_cms.updateCurrentMarkdown()",
                "TEXT": "Update MD"
            };
            canDelete = {
                "ONCLICK": "_cms.deleteCurrentMarkdown()",
                "TEXT": "Delete MD"
            };
            canCopy = {
                "ONCLICK": "_cms.copyBBCodeToCB()",
                "TEXT": "Copy BBCode"
            };
        }
        
        return [
            {
                "ONCLICK": "_cms.saveCurrentMarkdown()",
                "TEXT": "Save MD"
            },
            canUpdate,
            canDelete,
            canCopy
        ];
    },
    sidebarList_: function(){
        let mdConfig = new eConfig({name: `data-md`}),
            objList = {};
        
        for(let $_saveName in mdConfig.store){
            objList[$_saveName] = [];
        }
        
        
        return objList;
    }
    
};
