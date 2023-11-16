// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension, so you can't
// modify the `window` global without using the context bridge.
// Please note that you can still access the `window` global and,
// for example, add event listeners or update DOM elements.

const { contextBridge, ipcRenderer } = require('electron');


/*
const electron = require('electron');
const AdmZip = require('adm-zip');
const JSZip = require("jszip");
const fs = require(`fs-extra`);
const psList = require('ps-list'); // read running processes to detect Grim Dawn
const child_process = require('child_process'); // .execFile
//const chokidar = require('chokidar');
//let _watcher;
//let _watcherItems;
//let _watcherPS;
const mkpath = require('mkpath');
const eConfig = require('electron-store');
const marked = require('marked');
const markdown_toc = require('markdown-toc');
const fetchUrl = require("fetch").fetchUrl;
//const fetchUrl = require("fetch").fetchUrl;
//const app = require('electron').remote.app;
//const app = electron.remote.app;
const app = require('electron')
const {clipboard} = require('electron');
//const {clipboard} = electron;
//const log = require('electron').remote.require('electron-log');
//const log = electron.remote.require('electron-log');
let Log = console.log.bind(console);

// ContextMenu
const remote = require('electron').remote;
*/


/*
contextBridge.exposeInMainWorld('api', {
  getPath: () => ipcRenderer.invoke('getPath')
});
*/

contextBridge.exposeInMainWorld(
  'api', {
      send: (channel, data) => {
          // whitelist channels
          let validChannels = ["toMain"];
          if (validChannels.includes(channel)) {
              ipcRenderer.send(channel, data);
          }
      },
      receive: (channel, func) => {
          let validChannels = ["fromMain"];
          if (validChannels.includes(channel)) {
              // Deliberately strip event as it includes `sender` 
              ipcRenderer.on(channel, (event, ...args) => func(...args));
          }
      }
  }
);
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  output: () => `<p id="">This app is using Chrome (v${process.versions.chrome}), Node.js (v${process.versions.node}), and <button type="button" id="btn" onclick="console.log('testBtn')">Open a File</button> Electron (v${process.versions.electron})</p><p>More things down the line... <button type="button" id="btn" onclick="handleTestBtn2()">Test Button 2</button></p>`
  // we can also expose variables, not just functions
});

/*
const dirBase = __dirname.replace(/\\/g, "/"),
    dirAssets = `${dirBase}/assets`;
    //, dirUserData = app.getPath(`userData`);
//var wzDir,libWZ,_wzData,_wzTPL; // IDE auto-complete pre-declarations
let libWZ;
const wzIO = require(`./lib/wzIO`),
    wzNotify = require(`./lib/wzNotify`);
const appData = require(`./data`);
const WZ = require(`./lib/Wanez`);
require(`./inc`);
require('./updater.js');
*/

/*
// Set up context bridge between the renderer process and the main process
contextBridge.exposeInMainWorld(
  'myAPI', // This is just an arbitrary name of the window property you're creating.
           // It should be meaningful to your app.
  {
    // You can call this in the renderer like so:
    // window.myAPI.printNameToCLI(myName)
    printNameToCLI: (name) => ipcRenderer.send('print-name', name)
  }
)

// Handle the IPC message sent from the main process after it prints the
// name to the console by showing a status banner at the top
ipcRenderer.on('name-status', (event, message) => {
  const statusBanner = document.getElementById('status-banner')
  statusBanner.innerText = `Message from the main process: ${message}`

  // Do a fancy fade out of the status banner
  statusBanner.style.transition = 'opacity 3s ease-in';
  statusBanner.classList.add('hidden')
  statusBanner.addEventListener('transitionend', () => {
    // reset the status banner for the next form submission
    statusBanner.innerText = ''
    statusBanner.style.transition = ''
    statusBanner.classList.remove('hidden')
  })
})
*/


