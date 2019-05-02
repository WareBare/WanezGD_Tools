/**
 * Created by WareBare on 3/24/2017.
 */

module.exports = {
    Forms:{
        "configGD_Form": new WZ.Core.cFormWeb('configGD_Form')
    },
    tplContent: {
        "Main": "<div>{CONFIG_GD}</div>"
    },
    
    content_Main: function(){
        let out_ = `Main - Settings`;
        
        return out_;
    },
    content_GrimDawn: function(){
        
        return this.tplContent.Main.wzOut({
            "CONFIG_GD": this.Forms['configGD_Form'].show_()
        });
        
    },
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = `Choose "Grim Dawn" on the right in order to set important paths and file names`;
        
        if(this.contentType){
            if(this.contentType === `Main`){
                out_ = this.content_Main();
            }else if(this.contentType === `Grim Dawn`){
                out_ = this.content_GrimDawn();
            }
        }
        
        return out_;
    },
    
    sidebarBtns_: function(){
        return [];
    },
    sidebarList_: function(){
        return {
            'Main':[],
            'Grim Dawn': []
        }
    }
    
};
