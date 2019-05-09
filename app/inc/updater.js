
//const {app, BrowserWindow} = require('electron');
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
