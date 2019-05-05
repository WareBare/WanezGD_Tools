/**
 * Created by WareBare on 3/24/2017.
 */

_cms = false;
Super = _cms.Base; // simulating C++ Inheritance for module content (force of habit)

/**
 * loads content from a js function
 * @param {Array} $optCMS
 * @param {Boolean|Object} [$formData]
 */
wzCMS = function($optCMS,$formData){
    wzLoadingCMS(true);
    
    $formData = $formData || false; // if form - loadForm will have all the form data
    const navClassInActive = 'navInActive',
        navClassActive = 'navActive';
    // set nav item to active or inactive and set the variable for it
    try{
        document.getElementById('navItem_'+(appConfig.get('cms.0') || '')+(appConfig.get('cms.1') || '')+(appConfig.get('cms.2') || '')).className = 'navInActive';
    }catch(err){}
        appConfig.set('cms',$optCMS);
    try{
        document.getElementById('navItem_'+(appConfig.get('cms.0') || '')+(appConfig.get('cms.1') || '')+(appConfig.get('cms.2') || '')).className = 'navActive';
    }catch(err){}
    
    const CMS_0 = $optCMS[0] || '',
        CMS_1 = ($optCMS[1] && $optCMS[1] != '') ? '/'+$optCMS[1] : '',
        CMS_2 = ($optCMS[2] && $optCMS[2] != '') ? '/'+$optCMS[2]+'.js' : '/index.js';
    
    // Load Content/SideBar ToDo: SideBar
    const pathBase = `${dirBase}/inc/cms/${CMS_0}`,path = pathBase + CMS_1 + CMS_2,contentEl = document.getElementById('app_Content'),sidebarEl = document.getElementById('app_SideBar'),headerLocEl = document.getElementById('app_HeaderLoc');
    //console.log(path);
    try{
        fs.accessSync(path, fs.F_OK); // check if file exists
        //console.log('loading...');
        //const cmsBase = require(pathBase);
        const cms = require(path); // load file
        _cms = cms;
        Super = _cms;
        if($formData){ // check if $formData has form data or false (if form data is available it is a form validation)
            //cms.Forms
            //console.log($formData.id.split("::")[0]);
            return cms.Forms[$formData.id.split("::")[0]].validateForm($formData);
        }else{ // loadForm false will show the form
            let headerTitle_ = '',headerOnClick = '';
            for( let $_key in $optCMS ){
                if(headerTitle_ != ''){
                    headerTitle_ += '';
                    headerOnClick += ',';
                }
                headerOnClick += '\''+$optCMS[$_key]+'\'';
                headerTitle_ += '<span class="headerCMS_'+$_key+'" onclick="wzCMS(['+headerOnClick+']);">'+$optCMS[$_key]+'</span>';
            }
            try{
                cms.Base = require(pathBase+'/_Base.js');

                Super = _cms.Base;
                if(!cms.Base.bInitialized && cms.Base.Init){
                    cms.Base.Init();
                    cms.Base.bInitialized = true;
                }
                if(cms.Base.OnLoad) cms.Base.OnLoad();

                cms.Base.loadContent = function($contentType,$contentParams){
                    $contentType = $contentType || false;
                    $contentParams = $contentParams || false;
                    contentEl.innerHTML = cms.content_($contentType,$contentParams) || headerTitle_;
                    //wzLoadingCMS(false);
                    tipWZ.Init();
                };
                cms.Base.loadSideBar = function(){
                    sidebarEl.innerHTML = (cms.sidebar_) ? cms.sidebar_() : wzSideBarDefault(( (cms.sidebarBtns_) ? cms.sidebarBtns_() : false ), ( (cms.sidebarList_) ? cms.sidebarList_() : false ),( (cms.contentType) ? cms.contentType : false ),( (cms.tplSideBar) ? cms.tplSideBar : false ));
                };
                cms.Base.loadCMS = function($contentType,$contentParams){
                    wzLoadingCMS(true);
                    $contentType = $contentType || false;
                    $contentParams = $contentParams || false;
                    let $this = this;
                    setTimeout(function(){
                        $this.loadContent($contentType,$contentParams);
                        $this.loadSideBar();
                    }, 10);
                    //this.loadContent($contentType,$contentParams);
                };

                //Log(`finished`);

            }catch(err){}
            cms.Elements = {
                Content: contentEl,
                SideBar: sidebarEl,
                HeaderLoc: headerLocEl
            };

            if(!cms.bInitialized && cms.Init){
                cms.Init();
                cms.bInitialized = true;
            }
            if(cms.OnLoad) cms.OnLoad();

            setTimeout(function(){
                headerLocEl.innerHTML = headerTitle_;
                contentEl.innerHTML = cms.content_() || headerTitle_;
                sidebarEl.innerHTML = (cms.sidebar_) ? cms.sidebar_() : wzSideBarDefault(( (cms.sidebarBtns_) ? cms.sidebarBtns_() : false ), ( (cms.sidebarList_) ? cms.sidebarList_() : false ),( (cms.contentType) ? cms.contentType : false ),( (cms.tplSideBar) ? cms.tplSideBar : false ));
                //wzLoadingCMS(false);
                //AddToolTips();
                tipWZ.Init();
            }, 10);
            //headerLocEl.innerHTML = headerTitle_;
            //contentEl.innerHTML = cms.content_() || headerTitle_;
            //sidebarEl.innerHTML = (cms.sidebar_) ? cms.sidebar_() : wzSideBarDefault(( (cms.sidebarBtns_) ? cms.sidebarBtns_() : false ), ( (cms.sidebarList_) ? cms.sidebarList_() : false ),( (cms.contentType) ? cms.contentType : false ),( (cms.tplSideBar) ? cms.tplSideBar : false ));
        }
    }catch(err){
        console.error(err);
    }
};
wzSideBarDefault = function($btns_,$list_,$contentType,$tpl){
    $btns_ = appData.tpl.Buttons.Default.wzParseTPL($btns_) || ``;
    $list_ = $list_ || ``;
    $contentType = $contentType || false;
    $tpl = $tpl || "<div class='areaTop'>{BUTTONS}</div><div class='areaBottom'>{LIST}</div>";
    
    if(typeof $list_ !== 'string'){
        let aBTNs = [];
        
        for( let $_contentType in $list_ ){
            //console.log(`CMS: ${$list_[$_contentType]}`);
            // can use .param for an additional parameter and .text if the button text should be different than the content type
            //if($list_[$_contentType].TEXT){
                aBTNs.push({
                    "ONCLICK": `_cms.Base.loadCMS('${$_contentType}','${$list_[$_contentType].param}');`, // ,${`'${$list_[$_contentType]}'` || false}
                    "TEXT": $list_[$_contentType].text || $_contentType,
                    "CHECKED": ($_contentType === $contentType) ? 'checked':''
                });
            //}
            
        }
        
        $list_ = appData.tpl.Buttons.ListCSS.wzParseTPL(aBTNs);
    }
    
    return $tpl.wzOut({
        "BUTTONS": $btns_,
        "LIST": $list_
    });
};

//noinspection JSUnresolvedVariable
wzReloadCMS = function($setTimeout){
    if($setTimeout){
        setTimeout(function(){
            wzCMS(appConfig.get('cms'));
        }, $setTimeout);
    }else{
        wzCMS(appConfig.get('cms'));
    }
    
};

wzLoadingCMS = function(bInStartLoading){
    bInStartLoading = bInStartLoading || false;
    let LoadingScreen;
    
    if(bInStartLoading){
        //console.log(`Start Loading`);
        LoadingScreen = document.createElement(`div`);
        LoadingScreen.setAttribute(`id`, `wzLoadingScreen`);
        
        let LoadingImage = document.createElement(`div`);
        LoadingImage.setAttribute(`class`, `loadingImage`);
        LoadingImage.innerHTML = `Loading...`;
        
        LoadingScreen.appendChild(LoadingImage);
        
        document.body.appendChild(LoadingScreen);
    
        setTimeout(function(){
            wzLoadingCMS(false);
        }, 10);
    }else{
        //console.log(`Finish Loading`);
        LoadingScreen = document.getElementById(`wzLoadingScreen`);
        document.body.removeChild(LoadingScreen);
    }
};
