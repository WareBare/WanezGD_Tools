/**
 * Created by WareBare on 3/24/2017.
 *
 * Wanez Framework/CMS for Electron
 * @author WareBare (Daniel Kamp)
 * @copyright Copyright (c) 2017, WareBare (Daniel Kamp). All rights reserved.
 * @website https://github.com/WareBare
 * @version 0.1
 *
 */

//log.warn(`Program loaded using: v${app.getVersion()}`);

appConfig = new eConfig({name: `settings-app`});
bDev = (app.getName() === `Electron`) ? true : false;

if(!appConfig.has('cms')){
    appConfig.set('cms.0',`Home`);
    appConfig.set('cms.1',false);
    appConfig.set('cms.2',false);
}

ExecuteProgramGD = function(InExecutable){
    if(appConfig.get(`GrimDawn.Paths.Game`)){
        child_process.execFile(`${appConfig.get(`GrimDawn.Paths.Game`)}/${InExecutable}`, function(err, data) {
            if(err){
                console.error(err);
                return;
            }
        });
    }
};


require(`./cms`);
require(`./wnd`);

_app = new WZ.Core.cApp();
_app.create_();
wzCMS(appConfig.get('cms'));



let keyUp = (e) => {
    //console.log(e.keyCode);
    
    if(e.keyCode === 116){
        location.reload();
    }else if(e.keyCode === 112){
        wzCMS([`Docs`,`ReadMe`]);
    }else if(e.keyCode === 113){
        wzCMS([`Docs`,`Change Log`]);
    }else if(e.keyCode === 117){
        wzWND('Settings').refresh();
    }
    
};
let keyDown = (e) => {
    
};


document.addEventListener('keyup', keyUp, false);
document.addEventListener('keydown', keyDown, false);

