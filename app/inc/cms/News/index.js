/**
 * Created by WareBare on 3/24/2017.
 */

module.exports = {
    tplContent: {},
    
    content_: function($contentType){
        let url = `https://api.github.com/repos/WareBare/WanezGD_Tools/releases`;
        fetchUrl(`${url}`, function(error, meta, body){
            Log(JSON.parse(body.toString()));
            /*
                outHTML = marked(
                    `# News\r\n` +
                    `\r\n---\r\n` +
                    `# Table of Contents\r\n` +
                    markdown_toc(body.toString()).content +
                    `\r\n---\r\n` +
                    body.toString()
                    );
                document.getElementById(`${InContainerClass}`).innerHTML = outHTML;
                */
            }
        );
        
        return UseMarkdownParsingOnURL(`https://github.com/WareBare/WanezGD_Tools/wiki/News.md`, `News`);
    },
    
    sidebarBtns_: function(){
        return [];
    },
    sidebarList_: function(){
        return {}
    }
    
};
