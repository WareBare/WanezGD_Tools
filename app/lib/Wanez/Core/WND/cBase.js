/**
 * Created by WareBare on 4/2/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cBase extends libWZ.Core.cBase{
    
    constructor($wndId){
        super();
        
        this.iID = $wndId;
        
        this.tpl = {
            Frame: `<div></div>`,
            Header: ``,
            Nav: ``,
            Body: `<div class="body">{CONTENT_TEXT}</div>`,
            Sidebar: `<div></div>`,
            Footer: `<div></div>`
        };
        this.wndClass = `wz`;
        this.title = ``;
        this.content = ``;
        this.parentEl;
    
        this.iniWND();
    }
    
    iniWND(){
        this.wnd = document.createElement(`div`);
        this.wnd.className = `wzWND`;
        this.wnd.style.maxHeight = `${(document.body.scrollHeight - 200)}px`;
        this.wnd.style.maxWidth = `${(document.body.scrollWidth / 2)}px`;
        
    }
    
    moveToCenter(){
        this.move(
            `${(document.body.scrollWidth / 2) - (this.wnd.offsetWidth / 2)}px`,
            `${(document.body.scrollHeight / 2) - (this.wnd.offsetHeight / 2)}px`
        );
    }
    
    /**
     *
     * @param {String} $x
     * @param {String} [$y]
     */
    move($x,$y){
        if($x) this.wnd.style.left = `${$x}`;
        if($y) this.wnd.style.top = `${$y}`;
    }
    
    create(){
        this.wnd.className += ` ${this.wndClass}`;
        this.loadContent();
        if(this.wndClass === `wzNotify`){
            this.parentEl = document.getElementById(`notifyArea`);
        }else{
            this.parentEl = document.body;
        }
        this.parentEl.appendChild(this.wnd);
        
        
        if(this.iSettings){
            
            this.wnd.style.height = this.iSettings.height || this.wnd.style.height;
            this.wnd.style.width = this.iSettings.width || this.wnd.style.width;
            
        }
        if(this.wndClass !== `wzNotify`) this.moveToCenter();
    }
    show(){
    
    }
    destroy(){
        this.parentEl.removeChild(this.wnd);
        //wzCMS(appConfig.get('cms'));
    }
    loadContent(){
        this.wnd.innerHTML = `${this.tpl.Header}${this.tpl.Nav}${this.tpl.Body}`.wzOut({
            TITLE_TEXT: this.title,
            CONTENT_TEXT: this.content
        });
    }
    
    
};
