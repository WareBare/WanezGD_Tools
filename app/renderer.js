
console.log('Hello World!');

const information = document.getElementById('App_GeneratedContent')
information.innerHTML = `<p id="">This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and <button type="button" id="btn" onclick="console.log('testBtn')">Open a File</button> Electron (v${versions.electron()})</p>`


//let mainContainer = document.createElement(`p`);
//mainContainer.innerHTML = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and <button type="button" id="btn" onclick="console.log('testBtn')">Open a File</button> Electron (v${versions.electron()})`;

//information.appendChild(mainContainer);

const func = async () => {
  const response = await window.versions.ping()
  information.innerHTML = await window.versions.output()
  console.log(response) // prints out 'pong'
}

func()

function handleTestBtn2()
{
  console.log(`Function moved into file!`)
}

/*
    window.api.receive("fromMain", (data) => {
        console.log(`Received ${data} from main process`);
    });
    window.api.send("toMain", "some data");
    */

/*
const electron = require('electron');
const {app, clipboard, ipcRenderer} = electron;

const AdmZip = require('adm-zip');
const JSZip = require("jszip");
const fs = require(`fs-extra`);
const psList = require('ps-list'); // read running processes to detect Grim Dawn
const child_process = require('child_process'); // .execFile
const mkpath = require('mkpath');
const eConfig = require('electron-store');
const marked = require('marked');
const markdown_toc = require('markdown-toc');
const fetchUrl = require("fetch").fetchUrl;
//const fetchUrl = require("fetch").fetchUrl;
//const app = require('electron').remote.app;
//const app = electron.remote.app;
//const app = require('electron')
//const {clipboard} = electron;
//const log = require('electron').remote.require('electron-log');
//const log = electron.remote.require('electron-log');
let Log = console.log.bind(console);

// ContextMenu
//const remote = require('electron').remote;
//const ctxMenu = remote.require('electron-editor-context-menu');
//const MenuItem = require('electron-context-menu');
//const path = require('path');
//const request = require('request');
//const PSD = require('psd');
*/


/*
const dirUserData = window.api.getPath();
window.api.getPath()
  .then((appDataPath) => {
    // ...
    dirUserData = appDataPath;
  })
console.log(dirUserData);
*/

/*
const dirBase = __dirname.replace(/\\/g, "/"),
    dirAssets = `${dirBase}/assets`
    , dirUserData = app.getPath('userData');

console.log(dirUserData)
//var wzDir,libWZ,_wzData,_wzTPL; // IDE auto-complete pre-declarations
let libWZ;
const wzIO = require(`./lib/wzIO`),
    wzNotify = require(`./lib/wzNotify`);
const appData = require(`./data`);
const WZ = require(`./lib/Wanez`);
require(`./inc`);
require('./updater.js');
*/
