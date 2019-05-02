/**
 * Created by Ware on 10/13/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        //let out_ = `Merger Tools (Preview 1)`;
        let out_ = `Loading...`;
        
        out_ = marked(fs.readFileSync(`${dirBase}/docs/merger.md`, 'utf8'));
        
        setTimeout(() => {
            document.getElementById(`md_changelog`).innerHTML = out_;
        },10);
        
        return `<div id="md_changelog" class="md">${out_}</div>`;
    },
    
    sidebarBtns_: function(){
        return [
        
        ];
    },
    sidebarList_: function(){
        return {}
    }
    
};
