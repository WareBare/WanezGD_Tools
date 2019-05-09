/**
 * Created by WareBare on 8/22/2016.
 */

const {app, BrowserWindow, dialog} = require('electron');
const {} = require('electron');
const { autoUpdater }  = require("electron-updater");
//AppUpdater = require(`./updater.js`);
// Put the next line within the window creation function

let PeriodicChecker = setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 3600000);

class AppUpdater {
    constructor() {
      //log.transports.file.level = 'info';
      //autoUpdater.logger = log;
      //autoUpdater.checkForUpdatesAndNotify();


      autoUpdater.checkForUpdates();

      autoUpdater.on('update-available', this.OnUpdateAvailable);
      autoUpdater.on('update-not-available', this.OnUpdateNotAvailable);
      autoUpdater.on('update-downloaded', this.OnUpdateDownloaded);
    }


    OnUpdateAvailable(){
        clearInterval(PeriodicChecker);
    }

    OnUpdateNotAvailable(){
        //setTimeout(() => autoUpdater.checkForUpdates(), 10000);
    }

    OnUpdateDownloaded(){
        clearInterval(PeriodicChecker);
        dialog.showMessageBox({
            title: 'Update Ready to Install',
            message: 'Update has been downloaded',
            buttons: [
                'Install Later',
                'Install Now'
            ],
            defaultId: 1
        }, (response) => {
            if (response === 0) {
                dialog.showMessageBox({
                    title: 'Installing Later',
                    message: 'Update will be installed when you exit the app'
                });
            } else {
                autoUpdater.quitAndInstall();
                setTimeout(() => app.quit(), 1000);
            }
        });
    }
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 600,
        minWidth: 860,
        backgroundColor: '#202020'
        //, useContentSize: true
        , webPreferences: {
            //preload: path.join(app.getAppPath(), 'app/main.js')
            nodeIntegration: true
            , allowEval: false
            , contextIsolation: false
        }
    });

    win.maximize();
    win.setMenu(null);

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/index.html`);

    // Open the DevTools.
    //win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    
    new AppUpdater();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//require('./app/inc');

app.on('asynchronous-message', (event, arg) => {
    console.log(arg);  // prints "ping"
    event.sender.send('asynchronous-reply', 'pong');
});


