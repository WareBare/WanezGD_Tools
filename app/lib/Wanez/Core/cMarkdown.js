/**
 * Created by WareBare on 4/28/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cMarkdown extends libWZ.Core.cBase{
    
    constructor($markdown){
        super();
        
        this.iMarkdown = $markdown;
        this.iSettings = {
            h1: {},
            h2: {},
            h3: {},
            h4: {}
        };
        
        this.objMarkdown = {};
        this.aMarkdown = [];
        
        this.html = ``;
        this.bbcode = ``;
        
        this.iniMarkdown();
        
    }
    
    iniMarkdown(){
        let aData = this.iMarkdown.split(`\n`),tempHTML,tempBBCode,
            tempList,out,newList = true,newSubList = true;
        
        this.aMarkdown = aData;
        //console.log(this.iSettings);
        this.html = ``;
        this.bbcode = ``;
        
        for(let $_Index in aData){
            if(this.bbcode !== ``) this.bbcode += `\n`;
            if(this.html !== `` && newList) this.html += `<br />`;
            out = aData[$_Index];
            tempHTML = ``;
            tempBBCode = ``;
            if(out.startsWith(`# `)){
                out = out.replace(/^# /g,``).replace(/ #$/g,``);
                tempHTML += `<h1 style="${(this.iSettings.h1.color) ? `color:${this.iSettings.h1.color};` : ``}${(this.iSettings.h1.underline) ? `text-decoration:underline;` : ``}${(this.iSettings.h1.bold) ? `font-weight:bold;` : ``}${(this.iSettings.h1.italic) ? `font-style:italic;` : ``}">${out}</h1>`;
                tempBBCode += `[SIZE="6"]${(this.iSettings.h1.color) ? `[COLOR="${this.iSettings.h1.color}"]` : ``}${(this.iSettings.h1.underline) ? `[U]` : ``}${(this.iSettings.h1.bold) ? `[B]` : ``}${(this.iSettings.h1.italic) ? `[I]` : ``}${out}${(this.iSettings.h1.italic) ? `[/I]` : ``}${(this.iSettings.h1.bold) ? `[/B]` : ``}${(this.iSettings.h1.underline) ? `[/U]` : ``}${(this.iSettings.h1.color) ? `[/COLOR]` : ``}[/SIZE]`;
            }else if(out.startsWith(`## `)){
                out = out.replace(/^## /g,``).replace(/ ##$/g,``);
                tempHTML += `<h2 style="${(this.iSettings.h2.color) ? `color:${this.iSettings.h2.color};` : ``}${(this.iSettings.h2.underline) ? `text-decoration:underline;` : ``}${(this.iSettings.h2.bold) ? `font-weight:bold;` : ``}${(this.iSettings.h2.italic) ? `font-style:italic;` : ``}">${out}</h2>`;
                tempBBCode += `[SIZE="5"]${(this.iSettings.h2.color) ? `[COLOR="${this.iSettings.h2.color}"]` : ``}${(this.iSettings.h2.underline) ? `[U]` : ``}${(this.iSettings.h2.bold) ? `[B]` : ``}${(this.iSettings.h2.italic) ? `[I]` : ``}${out}${(this.iSettings.h2.italic) ? `[/I]` : ``}${(this.iSettings.h2.bold) ? `[/B]` : ``}${(this.iSettings.h2.underline) ? `[/U]` : ``}${(this.iSettings.h2.color) ? `[/COLOR]` : ``}[/SIZE]`;
            }else if(out.startsWith(`### `)){
                out = out.replace(/^### /g,``).replace(/ ###$/g,``);
                tempHTML += `<h3 style="${(this.iSettings.h3.color) ? `color:${this.iSettings.h3.color};` : ``}${(this.iSettings.h3.underline) ? `text-decoration:underline;` : ``}${(this.iSettings.h3.bold) ? `font-weight:bold;` : ``}${(this.iSettings.h3.italic) ? `font-style:italic;` : ``}">${out}</h3>`;
                tempBBCode += `[SIZE="4"]${(this.iSettings.h3.color) ? `[COLOR="${this.iSettings.h3.color}"]` : ``}${(this.iSettings.h3.underline) ? `[U]` : ``}${(this.iSettings.h3.bold) ? `[B]` : ``}${(this.iSettings.h3.italic) ? `[I]` : ``}${out}${(this.iSettings.h3.italic) ? `[/I]` : ``}${(this.iSettings.h3.bold) ? `[/B]` : ``}${(this.iSettings.h3.underline) ? `[/U]` : ``}${(this.iSettings.h3.color) ? `[/COLOR]` : ``}[/SIZE]`;
            }else if(out.startsWith(`#### `)){
                out = out.replace(/^#### /g,``).replace(/ ####$/g,``);
                tempHTML += `<h3 style="${(this.iSettings.h4.color) ? `color:${this.iSettings.h4.color};` : ``}${(this.iSettings.h4.underline) ? `text-decoration:underline;` : ``}${(this.iSettings.h4.bold) ? `font-weight:bold;` : ``}${(this.iSettings.h4.italic) ? `font-style:italic;` : ``}">${out}</h3>`;
                tempBBCode += `[SIZE="4"]${(this.iSettings.h4.color) ? `[COLOR="${this.iSettings.h4.color}"]` : ``}${(this.iSettings.h4.underline) ? `[U]` : ``}${(this.iSettings.h4.bold) ? `[B]` : ``}${(this.iSettings.h4.italic) ? `[I]` : ``}${out}${(this.iSettings.h4.italic) ? `[/I]` : ``}${(this.iSettings.h4.bold) ? `[/B]` : ``}${(this.iSettings.h4.underline) ? `[/U]` : ``}${(this.iSettings.h4.color) ? `[/COLOR]` : ``}[/SIZE]`;
            }else if(out.startsWith(`* `)){
                if(!newSubList) {
                    newSubList = true;
                    tempHTML += `</ul>`;
                    tempBBCode += `[/LIST]\n`;
                }
                if(newList) {
                    tempHTML += `<ul>`;
                    tempBBCode += `[LIST]\n`;
                    newList = false;
                }
                out = out.replace(/^\* /g,``);
                tempHTML += `<li>${out}</li>`;
                tempBBCode += `[*]${out}`;
            }else if(out.startsWith(`  * `) || out.startsWith(` * `)){
                if(newSubList) {
                    newSubList = false;
                    tempHTML += `<ul>`;
                    tempBBCode += `[LIST]\n`;
                }
                //out = out.replace(/\s/g, '');
                out = out.replace(/^ +\* /g,``);
                tempHTML += `<li>${out}</li>`;
                tempBBCode += `[*]${out}`;
            }else if(out === ``){
                if(!newSubList) {
                    newSubList = true;
                    tempHTML += `</ul>`;
                    tempBBCode += `[/LIST]\n`;
                }
                if(!newList) {
                    tempHTML += `</ul>`;
                    tempBBCode += `[/LIST]`;
                    newList = true;
                }
                tempHTML += `<br />`;
                tempBBCode += `\n`;
            }else{
                tempHTML += `${out}`;
                tempBBCode += `${out}`;
            }
    
    
            if(out.match(/[^`]`[a-zA-Z0-9]/)){
                tempHTML = `${tempHTML.replace(/([^`])`([a-zA-Z0-9])([^`]+)([a-zA-Z0-9])`([^`])/g,`$1<span style="color:seagreen;">$2$3$4</span>$5`)}`;
                tempBBCode = `${tempBBCode.replace(/([^`])`([a-zA-Z0-9])([^`]+)([a-zA-Z0-9])`([^`])/g,`$1[COLOR="seagreen"]$2$3$4[/COLOR]$5`)}`;
                //console.log(tempBBCode.replace(/([^`])`([a-zA-Z0-9])([^`]+)([a-zA-Z0-9])`([^`])/g,`$1[COLOR="seagreen"]$2$3$4[/COLOR]$5`));
            }
            if(out.match(/[^`]``[a-zA-Z0-9]/)){
                tempHTML = `${tempHTML.replace(/([^`])``([a-zA-Z0-9])([^`]+)([a-zA-Z0-9])``([^`])/g,`$1<span style="color:black;">$2$3$4</span>$5`)}`;
                tempBBCode = `${tempBBCode.replace(/([^`])``([a-zA-Z0-9])([^`]+)([a-zA-Z0-9])``([^`])/g,`$1[SPOILER2]$2$3$4[/SPOILER2]$5`)}`;
            }
            
            if(out.match(/[^_]_[a-zA-Z0-9]/)){
                tempHTML = `${tempHTML.replace(/([^_])_([a-zA-Z0-9])([^_]+)([a-zA-Z0-9])_([^_])/g,`$1<i>$2$3$4</i>$5`)}`;
                tempBBCode = `${tempBBCode.replace(/([^_])_([a-zA-Z0-9])([^_]+)([a-zA-Z0-9])_([^_])/g,`$1[I]$2$3$4[/I]$5`)}`;
                //console.log(out.replace(/([^_])_([a-zA-Z0-9])([^_]+)_([^_])/g,`$1<i>$2$3</i>$4`));
            }
            if(out.match(/[^_]__[a-zA-Z0-9]/)){
                tempHTML = `${tempHTML.replace(/([^_])__([a-zA-Z0-9])([^_]+)([a-zA-Z0-9])__([^_])/g,`$1<b>$2$3$4</b>$5`)}`;
                tempBBCode = `${tempBBCode.replace(/([^_])__([a-zA-Z0-9])([^_]+)([a-zA-Z0-9])__([^_])/g,`$1[B]$2$3$4[/B]$5`)}`;
            }
            if(out.match(/[^_]___[a-zA-Z0-9]/)){
                tempHTML = `${tempHTML.replace(/([^_])___([a-zA-Z0-9])([^_]+)([a-zA-Z0-9])___([^_])/g,`$1<u>$2$3$4</u>$5`)}`;
                tempBBCode = `${tempBBCode.replace(/([^_])___([a-zA-Z0-9])([^_]+)([a-zA-Z0-9])___([^_])/g,`$1[U]$2$3$4[/U]$5`)}`;
            }
            
            this.html += tempHTML;
            this.bbcode += tempBBCode;
        }
        if(!newList) {
            this.html += `</ul>`;
            this.bbcode += `\n[/LIST]`;
            newList = true;
        }
        
        //console.log(this.bbcode);
    }
    
    updateMarkdown($markdown,$settings){
        if($markdown) this.iMarkdown = $markdown;
        if($settings) this.iSettings = $settings;
    
        this.iniMarkdown();
    }
    
    deleteMarkdown($saveName){
        let mdConfig = new eConfig({name: `data-md`}),
            curConfig = mdConfig.store;
    
        if($saveName) delete curConfig[$saveName];
        //curConfig[saveName] = this.aMarkdown;
    
        mdConfig.store = curConfig;
    }
    saveMarkdown($saveName){
        let saveName = document.getElementById(`mdSaveName`).value,
            mdConfig,curConfig;
        
        
        if (saveName && saveName !== ``) {
            mdConfig = new eConfig({name: `data-md`});
            curConfig = mdConfig.store;
    
            if($saveName) delete curConfig[$saveName];
            curConfig[saveName] = {
                settings: this.iSettings,
                text: this.aMarkdown
            };
            
            mdConfig.store = curConfig;
            //mdConfig.set(saveName,this.aMarkdown);
        }else{
            wzNotify.err(`You need to enter a Title to save you Text`,`Unable to Save Markdown`);
        }
    }
    loadMarkdown($saveName){
        let mdConfig = new eConfig({name: `data-md`}),
            aData = mdConfig.store[$saveName];
    
        if(aData.settings) this.iSettings = aData.settings;
        this.iMarkdown = ``;
        for(let $_Index in aData.text){
            if(this.iMarkdown !== ``) this.iMarkdown += `\n`;
            this.iMarkdown += aData.text[$_Index];
        }
    
        this.iniMarkdown();
        
    }
    
};