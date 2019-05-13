/**
 * Created by WareBare on 05/13/2019.
 */

module.exports = {
    tplContent: {},
    
    content_: function($contentType){
        let url = `https://api.github.com/repos/WareBare/WanezGD_Tools/releases`;
        //let url = `https://api.github.com/repos/WareBare/WanezModGD/releases`;
        
        
        fetchUrl(`${url}`, function(err, meta, InBody){
            if(err){ console.error(err); return false; }
            let releasesData = JSON.parse(InBody.toString())
                , contentMD = ``
                , promiseHTML = ``;
            for(let i = 0; i < releasesData.length; i++){
                contentMD += `\r\n# ${releasesData[i].name}\r\n${releasesData[i].body}`;
                //promiseHTML += UseMarkdownParsingOnContent(releasesData[i].body, releasesData[i].name);
            }
            document.getElementById(`md_changelog`).innerHTML = marked(
                `# Change Log\r\n` +
                `---` +
                `\r\n` +
                `*Change Log Archive, same as on the /releases/ page on GitHub*\r\n` +
                `\r\n` +
                `*You can open links in a new window with ctrl+click, but try to stay away from opening websites with the tool as it poses security risks. Save links to Websites will tell you they open a browser on click.*\r\n` +
                `\r\n` +
                `*ctrl+click could also be used to navigate through the Table of Contents (this is secure btw as it doesn't load a website)*\r\n` +
                `\r\n` +
                `---` +
                `\r\n` +
                `# Table of Contents\r\n` +
                markdown_toc(contentMD).content +
                `\r\n` +
                `---` +
                contentMD
            );
        });
        
        return `<div id="md_changelog" class="md"></div>`;
        
        //return UseMarkdownParsingOnURL(`https://github.com/WareBare/WanezGD_Tools/wiki/News.md`, `News`);
    },
    
    sidebarBtns_: function(){
        return [];
    },
    sidebarList_: function(){
        return {}
    }
    
};
