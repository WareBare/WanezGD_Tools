/**
 * Created by WareBare on 05/13/2019.
 */



module.exports = {
    tplContent: {},
    
    

    content_: function($contentType){
        let url = `https://api.github.com/repos/WareBare/WanezGD_Tools/releases`;
        
        // <span class=\"Link\" title=\"Opens link in Browser on click.\" onclick=\"require('electron').shell.openExternal(`https://discord.gg/ru6eU2p`)\">https://discord.gg/ru6eU2p</span>
        
        fetchUrl(`${url}`, function(err, meta, InBody){
            if(err){ console.error(err); return false; }
            let releasesData = JSON.parse(InBody.toString())
                , contentMD = ``;
            for(let i = 0; i < releasesData.length; i++){
                contentMD += `\r\n---\r\n# ${releasesData[i].name}\r\n${releasesData[i].body}\r\n`;
            }
            document.getElementById(`md_changelog`).innerHTML = marked(
                `# Change Log\r\n` +
                `---` +
                `\r\n` +
                `*Same as on the /releases/ page on GitHub*\r\n` +
                `\r\n` +
                `*You may use <kbd>Left-Click</kbd> on a link to open it in your default browser.*\r\n` +
                `\r\n` +
                `*You may use <kbd>Right-Click</kbd> on a link to copy its URL to Clipboard.*\r\n` +
                `\r\n` +
                `---` +
                `\r\n` +
                `# Table of Contents\r\n` +
                `<details><summary>List</summary>` +
                marked(markdown_toc(contentMD).content) +
                `</details>`
            );
            document.getElementById(`md_changelog`).innerHTML += SanitizeLinks(marked(contentMD));
        });
        
        return `<div id="md_changelog" class="md">Loading...</div>`;
    },
    
    sidebarBtns_: function(){
        return [];
    },
    sidebarList_: function(){
        return {}
    }
    
};
