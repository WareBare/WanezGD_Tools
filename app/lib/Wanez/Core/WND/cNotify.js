/**
 * Created by WareBare on 4/2/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cNotify extends libWZ.Core.WND.cBase{
    
    constructor($wndId,$contents){
        super($wndId);
    
        this.iContents = $contents;
        
        this.wndClass = `wzNotify`;
        
        
        this.iniNotify();
    }
    
    iniNotify(){
        let icon = ``;
        if(this.iContents.Icon){
            icon = `<img src="${this.iContents.Icon}"></img>`;
        }
        //this.title = this.iContents.Title;
        this.content = `${icon}<span class="header">${this.iContents.Title}</span><span>${this.iContents.Body}</span>`;
    }
    
};
