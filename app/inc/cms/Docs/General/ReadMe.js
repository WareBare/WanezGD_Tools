/**
 * Created by WareBare on 3/29/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = `Loading...`;
        
        fetchUrl(`https://raw.githubusercontent.com/WareBare/WanezToolsGD/master/README.md`,function(error, meta, body){
            out_ = marked(body.toString());
            //console.log(out_);
            document.getElementById(`md_info`).innerHTML = out_;
        });
        
        
        //console.log(out_);
        return `<div id="md_info" class="md">${out_}</div>`;
    },
    
    sidebarBtns_: function(){
        return [];
    },
    sidebarList_: function(){
        return {}
    }
    
};
