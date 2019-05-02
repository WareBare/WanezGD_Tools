/**
 * Created by WareBare on 3/31/2017.
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
        
        fetchUrl(`https://raw.githubusercontent.com/WareBare/WanezToolsGD/master/Changelog.md`,function(error, meta, body){
            out_ = marked(body.toString());
            document.getElementById(`md_changelog`).innerHTML = out_;
        });
        
        return `<div id="md_changelog" class="md">${out_}</div>`;
    },
    
    sidebarBtns_: function(){
        return [];
    },
    sidebarList_: function(){
        return {}
    }
    
};
