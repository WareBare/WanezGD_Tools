/**
 * Created by WareBare on 4/2/2017.
 *
 * Window-Notification-Dialog
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

let objWND = {};
_wnd = false;

wzWND = function($optWND,$type){
    $optWND = (typeof $optWND === `string`) ? [$optWND] : $optWND;
    let wndId = (Array.isArray($optWND)) ? $optWND[0] : $optWND,
        hasWnd = false,wnd,indexModule,contents;
    /*
    for(let $_Index in $optWND){
        if(wndId !== ``) wndId += `.`;
        wndId += $optWND[$_Index]
    }
    */
    if(!$type || typeof $type !== `string`){
        hasWnd = objWND[wndId] || false;
        if(!hasWnd){
            indexModule = require(`./${wndId}`);
            contents = require(`./${wndId}/_${indexModule.contentType}`);
        }
        wnd = objWND[wndId] || new WZ.Core.WND.cWindow(wndId,[indexModule,contents],$type); // $type are window settings in this case
        objWND[wndId] = wnd;
        _wnd = wnd;
        //wzWND({Title: `New Notify4`,Body: `Some text4`},`notify`);
    }else if($type === `notify`){
        wnd = new WZ.Core.WND.cNotify(wndId,$optWND);
        setTimeout(function(){
            wnd.destroy();
        },1000 * 2);
    }else{
        wnd = new WZ.Core.WND.cDialog(wndId,$type);
    }
    
    let fn = {
        show(){
            wnd.create();
        },
        toggle(){
            if(hasWnd){
                this.close();
            }else{
                this.show();
            }
        },
        close(){
            wnd.destroy();
            objWND[wndId] = false;
        },
        refresh(){
            if(hasWnd){
                let contentType = $optWND[1] || wnd.iContents.contentType;
                wnd.load(contentType,require(`./${wndId}/_${contentType}`));
            }else{
                this.show();
            }
        },
        form($event,$formId,$el,$refresh = false){
            //wnd.form($event,$formId,$el);
            this.__getContent().forms[$formId][$event]($el);
            if($refresh) {
                setTimeout(() => {
                    fn.refresh();
                },25);
            }
        },
        __get(){
            return wnd;
        },
        __getContent(){
            return wnd.iContents;
        }
    };
    
    //fn.toggle();
    
    return fn;
};

fnWND = {
    dragStart: function(e,$wndId){
        if($wndId) _wnd = objWND[$wndId];
        this.startX = e.pageX;
        this.startY = e.pageY;
    },
    drag: function(e){
        this.dragEnd(e);
        this.dragStart(e);
    },
    dragEnd: function(e){
        let mouseX = e.pageX - this.startX,
            mouseY = e.pageY - this.startY;
        _wnd.move(`${parseInt(_wnd.wnd.style.left) + mouseX}px`,`${parseInt(_wnd.wnd.style.top) + mouseY}px`);
    },
    close: function(e,$wndId){
        //objWND[$wndId].destroy();
        //objWND[$wndId] = false;
    },
    load: function($contentType,$wndId){
        //objWND[$wndId].load($contentType,require(`./${$wndId}/_${$contentType}`));
    }
};
