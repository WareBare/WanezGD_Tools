/**
 * Created by WareBare on 3/24/2017.
 */

module.exports = {
    tplContent: {},
    
    content_: function($contentType){
        return UseMarkdownParsingOnURL(`https://github.com/WareBare/WanezGD_Tools/wiki/News.md`, `News`);
    },
    
    sidebarBtns_: function(){
        return [];
    },
    sidebarList_: function(){
        return {}
    }
    
};
