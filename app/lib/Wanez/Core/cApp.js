/**
 * Created by WareBare on 3/24/2017.
 */

class cApp extends libWZ.Core.cBase{
    
    constructor(){
        super();
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
            addNavItem = true; // checks if menu item should be added (if setting enabled is false for .Text entries it will not show up in the navigation
            if(navText.startsWith(`.`)){
                addNavItem = false;
                navText = navText.replace(new RegExp('^\.'), ``);
                if(appConfig.get(`${navText}.Enabled`)){
                    addNavItem = true;
                }
            }
            // menuItems
            menuItems = '';
            if(addNavItem){
                for( let $_menuItem in tmpCMS[$_navItem] ){
                    menuText = $_menuItem;
        
                    // subMenuItems
                    subMenuItems = '';
                    for( let $_subMenuItem in tmpCMS[$_navItem][$_menuItem] ){
                        subMenuText = tmpCMS[$_navItem][$_menuItem][$_subMenuItem];
            
                        subMenuItems += tmpNav.SubMenuItem.wzOut({
                            "ID": "navItem_"+navText+menuText+subMenuText,
                            "TEXT": subMenuText,
                            "CMS_0": navText,
                            "CMS_1": menuText,
                            "CMS_2": subMenuText
                        });
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
        
        //noinspection JSUnresolvedFunction
        $opt = wzSetArDef($opt,{
            'Nav':'default'
        });
        
        //console.log();
        //const tmpData = require('./data/templates.json');
        /*
        let AppContent = document.createTextNode(this.appData.tpl.App.wzReplace({
            'HEADER': this.appData.tpl.Container.wzOut(this.appData.tpl_app.Header), // tmpData.app.Header.wzOut(tmpApp.Header)
            'NAV': this.appData.tpl.Container.wzOut(this.genNav($opt.Nav)),
            'CONTENT': this.appData.tpl.Container.wzOut(this.appData.tpl_app.Content),
            'SIDEBAR': this.appData.tpl.Container.wzOut(this.appData.tpl_app.SideBar),
            'FOOTER': this.appData.tpl.Container.wzOut(this.genFooter())
        }));
        document.body.appendChild(AppContent);

        return true;
        */
        return super.create_(this.appData.tpl.App,{
            'HEADER': this.appData.tpl.Container.wzOut(this.appData.tpl_app.Header), // tmpData.app.Header.wzOut(tmpApp.Header)
            'NAV': this.appData.tpl.Container.wzOut(this.genNav($opt.Nav)),
            'CONTENT': this.appData.tpl.Container.wzOut(this.appData.tpl_app.Content),
            'SIDEBAR': this.appData.tpl.Container.wzOut(this.appData.tpl_app.SideBar),
            'FOOTER': this.appData.tpl.Container.wzOut(this.genFooter())
        },document.body);
    }
    
}

module.exports = cApp;
