/**
 * Created by WareBare on 4/2/2017.
 *
 * wnd/[wndId-folder]
 * /index.js
 * - contentType => loads _X.js (var set by nav clicks)
 * - title => title string
 * - nav_() => returns array(`Item_01`) => without _ infront
 *
 * /_X.js
 * - content_() => return body output string
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cWindow extends libWZ.Core.WND.cBase{
    
    constructor($wndId,$contents,$settings){
        super($wndId);
        
        //console.log($contents);
        
        this.classTpl = {
            Header: {
                Frame: `<div class="header" draggable="true" ondrag="fnWND.drag(event);" ondragstart="fnWND.dragStart(event,'${this.iID}');" ondragend="fnWND.dragEnd(event);">{TITLE}{BUTTON_GRP}</div>`,
                Title: `<span class="title">{TITLE_TEXT}</span>`,
                ButtonGrp: `<span>{MINIMIZE}{MAXIMIZE}{CLOSE}</span>`,
                CloseBTN: `<img class="closeBtn" src="img/close.png" onclick="wzWND('${this.iID}').close();wzCMS(appConfig.get('cms'));"></img>`,
                MiniBTN: ``,
                MaxBTN: ``
            },
            Nav: {
                Btn: `<span>{TITLE}</span>`
            }
        };
        
        this.iIndex = $contents[0];
        this.iModule = $contents[1];
        this.iWndId = $wndId;
        this.iContents = Object.assign(this.iIndex,$contents[1]);
        this.iSettings = Object.assign($settings || {},this.iContents.Settings);
        this.wndClass = `wzWindow`;
        this.title = `No Title`;
        
        this.iniWindow();
    }
    
    iniWindow(){
        //this.load(this.iIndex.contentType,this.iModule);
        //require(`..../../app/`);
        
        //this.genNav();
        this.tpl.Header = this.classTpl.Header.Frame.wzOut({
            TITLE: this.classTpl.Header.Title,
            BUTTON_GRP: this.classTpl.Header.ButtonGrp.wzOut({
                MINIMIZE: this.classTpl.Header.MiniBTN,
                MAXIMIZE: this.classTpl.Header.MaxBTN,
                CLOSE: this.classTpl.Header.CloseBTN,
            })
        });
        this.tpl.Nav = `<div class="nav">${this.genNav()}</div>`;
        this.content = this.iContents.content_();
        this.title = `${this.iContents.title || `No Title`}${(this.iContents.titlePage) ? ` - ${this.iContents.titlePage}` : ``}`;
    }
    
    genNav(){
        let tempEl,tempContentType,objCon = this.iContents.nav_(),nav_ = ``;
            //nav_ = document.createElement(`div`);
        for(let $_Index in objCon){
            tempContentType = objCon[$_Index];
            /*
            tempEl = document.createElement(`span`);
            tempEl.addEventListener(`click`,function(){
                console.log(`${tempContentType}`);
                objCon.contentType = tempContentType;
                fnWND.reload();
            });
            tempEl.innerHTML = `${tempContentType}`;
            nav_.appendChild(tempEl);
            */
            if(tempContentType.startsWith(`.`)){
                nav_ += `<span class="disabled">${tempContentType.replace(/^\./,``)}</span>`;
            }else{
                nav_ += `<span class="${(this.iContents.contentType === tempContentType) ? `active`:``}" onclick="wzWND(['${this.iWndId}','${tempContentType}']).refresh()">${tempContentType}</span>`;
            }
            
            //console.log(tempContentType);
        }
        //console.log(nav_);
        //console.log(objCon);
        return nav_;
    }
    
    load($contentType,$module){
        this.iContents = Object.assign(this.iIndex,$module);
        //console.log($contentType);
        this.iContents.contentType = $contentType;
        this.iniWindow();
        this.loadContent();
    }
    
    form($event,$formId,$el){
        this.iContents.forms[$formId][$event]($el);
    }
    
};
