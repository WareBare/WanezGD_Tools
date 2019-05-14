/**
 * Created by WareBare on 3/28/2017.
 */


const ipc = require('electron').ipcRenderer;

let interval = setInterval(() => {
    ipc.send('invokeActionAvailable', 'someData');
    ipc.send('invokeActionUnavailable', 'someData');
    ipc.send('invokeActionReady', 'someData');
    ipc.send('invokeActionError', 'someData');
}, 10000);

let authButton = document.getElementById('installUpdate');
/*
authButton.addEventListener('click', function(){
    ipc.on('updateDownloaded', function(event, response){
        //processResponse(response);
        Log(`updateDownloaded`);
        ipc.send('quitAndInstall', 'someData');
    })
    //ipc.send('invokeAction', 'someData');
});
*/
ipc.on('updateDownloaded', function(event, response){
    //processResponse(response);
    Log(`updateDownloaded`);
    Log(response);
    clearInterval(interval);
    authButton.innerHTML = `Install v${response.version}`;
    authButton.className = "available";
    authButton.style.cursor = "pointer";
    authButton.onclick = function(){
        ipc.send('quitAndInstall', 'someData');
    };
    //ipc.send('quitAndInstall', 'someData');
});

ipc.on('updateAvailable', function(event, response){
    //processResponse(response);
    Log(`updateAvailable`);
    //clearInterval(interval);
    authButton.innerHTML = "Downloading...";
    authButton.className = "downloading";
});

ipc.on('updateNotAvailable', function(event, response){
    //processResponse(response);
    Log(`updateNotAvailable`);
    authButton.innerHTML = "";
});

ipc.on('updateError', function(event, response){
    //processResponse(response);
    Log(`updateError`);
    Log(response);
    authButton.innerHTML = `Error searching for Updates`;
});


ipc.send('invokeActionAvailable', 'someData');
ipc.send('invokeActionUnavailable', 'someData');
ipc.send('invokeActionReady', 'someData');
ipc.send('invokeActionError', 'someData');


//const app = require('electron').remote.app; //require('electron-auto-updater');
//const updater = require('electron').remote.require('electron-auto-updater');
//const updater = require('electron-updater');
//app.getVersion = require('./package.json').version;
//console.log(`what the hell`);
/*
const { autoUpdater }  = require("electron-updater");

module.exports = class AppUpdater {
    constructor() {
        //const log = require("electron-log")
        //log.transports.file.level = "info"
        //autoUpdater.logger = log
        console.log(`working`);
        autoUpdater.checkForUpdatesAndNotify()
    }
}
*/
//const updater = require("electron-updater").autoUpdater;
//const { autoUpdater } = require("electron-updater");
//Log(`what the hell 2`);
//autoUpdater.checkForUpdatesAndNotify();

/*
let interval = setInterval(() => {
    updater.autoUpdater.checkForUpdates();
}, 60000);

//if(app.getName() !== `Electron`){
if(app.getName() === `Electron`){
    Log(`test`);
    
    updater.autoUpdater.checkForUpdates();
    updater.autoUpdater.addListener("update-available", function (event) {
        clearInterval(interval);
        document.getElementById(`installUpdate`).innerHTML = "Downloading...";
        document.getElementById(`installUpdate`).className = "downloading";
    });
    
    updater.autoUpdater.addListener("update-not-available", function () {
        document.getElementById(`installUpdate`).innerHTML = "";
    });
    
    /**
     * releaseNotes
     * releaseName
     * releaseDate
     * updateURL
     *//*
    updater.autoUpdater.addListener("update-downloaded", (event, releaseNotes, releaseName, releaseDate, updateURL) => {
        new Notification(`WanezToolsGD is ready to Update!`, {
            body: `v${releaseName} will be installed when you exit the program or use the button to start the setup.`
        });
        document.getElementById(`installUpdate`).innerHTML = `Install v${releaseName}`;
        document.getElementById(`installUpdate`).className = "available";
        document.getElementById(`installUpdate`).style.cursor = "pointer";
        document.getElementById(`installUpdate`).onclick = function(){
            updater.autoUpdater.quitAndInstall();
        };
        console.log(`update ready`);
        return true;
    });
    updater.autoUpdater.addListener("error", (error) => {
        //console.log(error);
        console.error(`unable to search for updates`);
        document.getElementById(`installUpdate`).innerHTML = `Error searching for Updates`;
    });
    updater.autoUpdater.addListener("checking-for-update", (event) => {});
    
    console.log(`checking for updates`);
}else{
    //console.log(`unable to search for updates`);
    clearInterval(interval);
}

//wzAutoUpdater();


installUpdate = function(){
    updater.autoUpdater.quitAndInstall();
};
*/