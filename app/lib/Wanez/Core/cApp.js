/**
 * Created by WareBare on 3/24/2017.
 */

class cApp extends libWZ.Core.cBase{
    
    constructor(){
        super();

        /// ---
    }

    PostLoad()
    {
        const window = remote.getCurrentWindow();

        document.getElementById(`AppBtn_Minimize`).addEventListener(`click`, function(e){
            window.minimize();
        });

        document.getElementById(`AppBtn_Maximize`).addEventListener(`click`, function(e){
            if (window.isMaximized()) {
                window.unmaximize();
            }else{
                window.maximize();
            }
        });

        document.getElementById(`AppBtn_Close`).addEventListener(`click`, function(e){
            //window.close();
            window.hide();
        });

        const fnRunGame = function(InEvent){
            Log(`start`);
            const pathGrimDawn = appConfig.get(`GrimDawn.Paths.Game`);
            const bPathGameFileExists = fs.existsSync(`${pathGrimDawn}/Grim Dawn.exe`);

            if (bPathGameFileExists) {
                try{
                    //Log(`"${pathGrimDawn}/GrimInternals64.exe"`);
                    child_process.execSync(`cd "${pathGrimDawn}" && "GrimInternals64.exe"`);
                    window.hide();
                }catch(err){
                    console.error(err);

                    try{
                        child_process.execSync(`"${pathGrimDawn}/Grim Dawn.exe"`);
                        window.hide();
                    }catch(err2){
                        console.error(err2);
                    }
                }
            }else{
                console.log(`wrong path`);
                window.show();
            }
        }

        require('electron').ipcRenderer.on(`ShowWindow`, (InEvent) => {
            window.show();
            //console.log(`Showing Window again`);
            wzReloadCMS(10);
        });
        require('electron').ipcRenderer.on(`RunGame`, fnRunGame);

        document.getElementById(`App_RunGrimDawn`).addEventListener(`click`, () => {
            fnRunGame(false)
        });


        

        /*
        let psPromise = new Promise( (InResolve, InError) => {
            if (InError) {
                throw new Error(InError);
            }

            InResolve(Log(`starting 01`));
        }).then( () => {
            Log(`finished 01`);
        });
        */
        /*
        ps.lookup({
            command: `GrimInternals64`
        }, (InError, InResultList) => {
            if (InError) {
                throw new Error(InError);
            }
            // 33152
            Log(`starting 01`);
            InResultList.forEach( (InProcess) => {
                if (InProcess) {
                    console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', InProcess.pid, InProcess.command, InProcess.arguments );
                }
            });
            Log(`finished 01`);
        });

        ps.lookup({
            command: `Grim Dawn`
        }, (InError, InResultList) => {
            if (InError) {
                throw new Error(InError);
            }
            // 33152
            Log(`starting 02`);
            InResultList.forEach( (InProcess) => {
                if (InProcess) {
                    console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', InProcess.pid, InProcess.command, InProcess.arguments );
                }
            });
            Log(`finished 02`);
        });
        */
    }

    GenerateTitleBar()
    {
        let outTitleBar = {}
            , tmpTitleButton = `<div id="{ID}" class="TitleBarBTN">{TEXT}</div>`
            , windowButtons = ``
            , TitleBarContent = ``;
        
        const TitleBarId = this.appData.tpl_app.TitleBar.ID
            , tmpTitleBarContent = this.appData.tpl_app.TitleBar.CONTENT
            , titleBarSettings = this.appData.tpl_app.TitleBar.Settings;

        if (titleBarSettings.bUseButton_Minimize) {
            windowButtons += tmpTitleButton.wzReplace({
                ID: `AppBtn_Minimize`
                , TEXT: `-`
            });
        }
        if (titleBarSettings.bUseButton_Maximize) {
            windowButtons += tmpTitleButton.wzReplace({
                ID: `AppBtn_Maximize`
                , TEXT: `+`
            });
        }
        if (titleBarSettings.bUseButton_Close) {
            windowButtons += tmpTitleButton.wzReplace({
                ID: `AppBtn_Close`
                , TEXT: `x`
            });
        }

        TitleBarContent += tmpTitleBarContent.wzReplace({
            WINDOW_BUTTONS: windowButtons
        });

        outTitleBar = {
            "ID": TitleBarId
            , "CONTENT": TitleBarContent
        };

        // return full nav string with all navItems, menuItems and subMenuItems
        return outTitleBar;
    }

    GenerateHeader()
    {
        let outHeader = {
            ID: `App_Header`
            , CONTENT: ``
        };
        
        //const contentTexts = (`${appConfig.get('cms')}`).split(`,`);
        const tmpNotifyAreaContent = `<div id="notifyArea"></div>`;
        const tmpHeaderTitleContent = `<div id="app_HeaderApps">{TEXT}</div>`;
        const tmpHeaderNotifyContent = `<div id="App_HeaderNotify">Loading...</div>`;
        const tmpRefreshButton = `<img src="img/refresh.png" onclick="location.reload();" title="Reload (F5)"></img>`;
        const runGrimDawnGame = `<img id="App_RunGrimDawn" src="img/Grim Dawn.png" title="Start Grim Dawn"></img>`;

        outHeader.CONTENT += tmpNotifyAreaContent;
        outHeader.CONTENT += tmpHeaderTitleContent.wzReplace({
            //TEXT: `${contentTexts[contentTexts.length - 1]}`
            TEXT: ``
        });
        outHeader.CONTENT += tmpHeaderNotifyContent;
        outHeader.CONTENT += tmpRefreshButton;
        outHeader.CONTENT += runGrimDawnGame;
        
        return outHeader;
    }

    AllowNavItem(InNavPath){
        let outMenuStr = InNavPath
            , enablerData = appConfig.get(`Enablers`) || []
            , checkableStr = InNavPath.replace(/\./g, ``)
            , subItemIndex = InNavPath.length - InNavPath.replace(/\//g, ``).length
            , lastIndexOfEnabler = InNavPath.lastIndexOf(`.`)
            , lastIndexOfSubItem = InNavPath.lastIndexOf(`/`)
            , bLastNavItem = lastIndexOfEnabler > lastIndexOfSubItem;

        if(bLastNavItem){
            if(enablerData.includes(checkableStr)){
                outMenuStr = InNavPath.slice(lastIndexOfEnabler + 1);
            }else{
                outMenuStr = false;
            }
        }else if(subItemIndex){
            outMenuStr = InNavPath.slice(lastIndexOfSubItem + 1);
        }

        if(!outMenuStr){
            let currentLocationData = appConfig.get(`cms`)
                , cmsCheckSplit = checkableStr.split(`/`)
                , bResetCMS = true;
            for(let i = 0; i < cmsCheckSplit.length; i++){
                if(bResetCMS){
                    if(currentLocationData[i]){
                        bResetCMS = (currentLocationData[i] === cmsCheckSplit[i]);
                    }else{
                        bResetCMS = false;
                    }
                }
            }
            if(bResetCMS){
                appConfig.set(`cms`, ["News"]);
            }
        }

        return outMenuStr;
    }
    
    /**
     * generate Navigation from template in app.json.Nav.Items
     * @param $mode
     * @return {{ID: (string|*|string), CONTENT: String}}
     */
    genNav($mode){
        const tmpNav = this.appData.tpl.Nav;
        const tmpCMS = this.appData.tpl_app.Nav.Items;
        //const tmpNav = this.tmpCMS;
        let navItems = '',menuItems,navText,menuText,subMenuItems,subMenuText,addNavItem = true;
        
        // navItems
        for( let $_navItem in tmpCMS ){ // this.tmpApp.Nav.Items
            navText = $_navItem;

            navText = this.AllowNavItem(navText);

            /*
            addNavItem = true; // checks if menu item should be added (if setting enabled is false for .Text entries it will not show up in the navigation
            if(navText.startsWith(`.`)){
                addNavItem = false;
                navText = navText.replace(new RegExp('^\.'), ``);
                if(appConfig.get(`${navText}.Enabled`)){
                    addNavItem = true;
                }
            }
            */
            // menuItems
            menuItems = '';
            if(navText){
                for( let $_menuItem in tmpCMS[$_navItem] ){
                    menuText = $_menuItem;

                    menuText = this.AllowNavItem(`${navText}/${menuText}`);
                    
                    
                    // subMenuItems
                    subMenuItems = '';
                    if(menuText){
                        for( let i = 0; i < tmpCMS[$_navItem][$_menuItem].length; i++ ){
                            subMenuText = tmpCMS[$_navItem][$_menuItem][i];
    
                            subMenuText = this.AllowNavItem(`${navText}/${menuText}/${subMenuText}`);
    
                            if(subMenuText){
                                subMenuItems += tmpNav.SubMenuItem.wzOut({
                                    "ID": "navItem_"+navText+menuText+subMenuText,
                                    "TEXT": subMenuText,
                                    "CMS_0": navText,
                                    "CMS_1": menuText,
                                    "CMS_2": subMenuText
                                });
                            }
                            
                        }
                    
        
                        // merge subMenuItems with menuItems
                        menuItems += tmpNav.MenuItem.wzOut({
                            "ID": "navItem_"+navText+menuText,
                            "TEXT": menuText,
                            "CMS_0": navText,
                            "CMS_1": menuText,
                            "SUBMENU": (subMenuItems != '') ? tmpNav.SubMenu.wzOut({
                                "ITEMS": subMenuItems
                            }) : ''
                        });
                    }
                }
            
                // merge menuItems with navItems
                navItems += tmpNav.Item.wzOut({
                    "ID": "navItem_"+navText,
                    "TEXT": navText,
                    "CMS_0": navText,
                    "MENU": (menuItems != '') ? tmpNav.Menu.wzOut({
                        "ITEMS": menuItems
                    }) : ''
                });
            }
        }
        
        // return full nav string with all navItems, menuItems and subMenuItems
        return {
            "ID": this.appData.tpl_app.Nav.ID,
            "CONTENT": tmpNav.Frame.wzOut({"ITEMS":navItems})
        };
    }
    
    genFooter(){
        let out_ = ``;
        
        if(this.appData.tpl_app.Footer.hasConsole){
        
        }
        out_ += this.appData.tpl_app.Footer.tpl.body.wzOut({
            VERSION: app.getVersion(),
            COPYRIGHT: this.appData.app.Copyright,
            CONTACT: `Email: ${this.appData.app.Email} ${(this.appData.app.Discord) ? `| Discord: ${this.appData.app.Discord}` : ``} ${(this.appData.app.Info) ? `| Info: ${this.appData.app.Info}` : ``}`
        });
        
        return {
            ID: this.appData.tpl_app.Footer.ID,
            CONTENT: out_
        }
    }
    
    create_($opt){
        // ERRO: missing tmp (see constructor)
        if(this.isErro()) return false;
        
        $opt = wzSetArDef($opt,{
            'Nav':'default'
        });
        
        return super.create_(this.appData.tpl.App,{
            //'TITLE': this.appData.tpl.Container.wzOut(this.GenerateTitleBar()),
            //'HEADER': this.appData.tpl.Container.wzOut(this.appData.tpl_app.Header), // tmpData.app.Header.wzOut(tmpApp.Header)
            'HEADER': this.appData.tpl.Container.wzOut(this.GenerateHeader()),
            'NAV': this.appData.tpl.Container.wzOut(this.genNav($opt.Nav)),
            'CONTENT': this.appData.tpl.Container.wzOut(this.appData.tpl_app.Content),
            'SIDEBAR': this.appData.tpl.Container.wzOut(this.appData.tpl_app.SideBar),
            'FOOTER': this.appData.tpl.Container.wzOut(this.genFooter())
        }, document.getElementById(`App_GeneratedContent`)); // document.body
    }
    
}

module.exports = cApp;
