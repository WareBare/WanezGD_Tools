/**
 * Created by Ware on 10/21/2017.
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
        
        out_ = marked(fs.readFileSync(`${dirBase}/docs/ChangeLog.md`, 'utf8'));
        
        setTimeout(() => {
            document.getElementById(`md_changelog`).innerHTML = out_;
        },10);
        
        return `<div id="md_changelog" class="md">${out_}</div>`;
    },
    
    OpenFile: function(){
        child_process.exec(`${dirBase}/docs/ChangeLog.md`, function(err, data) {
            if(err){
                console.error(err);
                return;
            }
        });
    },
    
    sidebarBtns_: function(){
        let OpenFileBTN = {};
        
        if(app.getName() === `Electron`){
            OpenFileBTN = {
                "ONCLICK": "_cms.OpenFile()",
                "TEXT": "Open File"
            };
        }
        
        return [
            OpenFileBTN
        ];
    },
    sidebarList_: function(){
        return {}
    }
    
};
