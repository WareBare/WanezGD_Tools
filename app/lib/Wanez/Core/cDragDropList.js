/**
 * Created by WareBare on 05/03/2019.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

class cDragDropList extends libWZ.Core.cBase{
    
    /**
     *
     * @param InOpt
     */
    constructor(InOpt){
        super();
        
        this.InOpt = Object.assign({
            LegendName: ``
            , elementGroup: `default` // similar to how name works for radioButtons
            , OnDrop: `` // Callback function name inside _cms
            , OnClick: ``
            , bHasSearch: true
            , SearchTerm: ``
            , Width: false
            , Lists: [{
                Name: `Unset`
                , Text: `Empty`
                , Items: [{
                    Text: `No Text`
                    , ActionData: `Empty` // String that is used inside Callback function (_cms)
                }]
                , bUseBreak: false
            }]
        },InOpt || {});
        
        this.tplList = {
            Container: `<div class="DragDropList">{LISTS}</div>`
            , SearchField: `Search <input type="text" onchange="(function(el){_cms.SearchTerm = el.value;wzReloadCMS(10);})(this)" value="{SEARCH_TERM}" /><br />`
            , LegendContainer: `<div class="DragDropList"><fieldset><legend>{LEGEND_NAME}</legend>{SEARCH}{LISTS}</fieldset></div>`
            , List: `<div class="List" style="${InOpt.Width ? `width: ${InOpt.Width}px;` : ``}"><div class="Header">{HEADER}</div><div class="Content" wz-listKey="{LIST_KEY}" ondrop="(function(e){ if(_cms.ActiveGroup === '{ELEMENT_GROUP}') _cms.{CALLBACK}(e); })(event)" ondragover="(function(e){ if(_cms.ActiveGroup === '{ELEMENT_GROUP}') e.preventDefault();})(event)" ondragenter="(function(e){e.preventDefault(); if(_cms.ActiveGroup === '{ELEMENT_GROUP}') e.target.style.border = '3px dotted red';})(event)" ondragleave="(function(e){e.preventDefault(); e.target.style.border = '';})(event)">{ENTRIES}</div></div>`
            , EntryField: `<div class="EntryField{B_CHECKED}" onclick="{ON_CLICK}" draggable="true" wz-listKey="{LIST_KEY}" ondragstart="(function(e){e.target.style.opacity = '0.2'; _cms.ActiveGroup = '{ELEMENT_GROUP}';e.dataTransfer.setData('ActionData', '{ACTION_DATA}');e.dataTransfer.setData('ListKey', '{LIST_KEY}');})(event)" ondragend="wzReloadCMS(10);" ondragenter="(function(e){e.preventDefault(); if(_cms.ActiveGroup === '{ELEMENT_GROUP}') e.target.style.visibility = 'hidden';})(event)" ondragleave="(function(e){e.preventDefault(); if(_cms.ActiveGroup === '{ELEMENT_GROUP}') e.target.style.visibility = 'hidden';})(event)"{AUTOFOCUS}>{TEXT}</div>`
        };
        
    }
    
    
    
    create_(){
        // ERRO: missing tmp (see constructor)
        if(this.isErro()) return false;
        
        let Output = ``;
        let ListsOutput = ``;
        let EntriesOutput = ``;
        
        let tplList = this.tplList;
        let iOpt = this.InOpt;
        
        this.InOpt.Lists.forEach(function(ListData, ListId){
            EntriesOutput = ``;
    
            
            if(ListData.Items){
                ListData.Items.forEach(function(ListItemData, ListItemId){
                    // Prepare Entries for List output.
                    if(ListItemData.Text && ListItemData.ActionData && 
                        ( (iOpt.bHasSearch && iOpt.SearchTerm !== ``) ? (ListItemData.Text.toLowerCase()).includes(iOpt.SearchTerm.toLowerCase()) : true ) ){
                        EntriesOutput += tplList.EntryField.wzReplace({
                            TEXT: ListItemData.Text
                            , ACTION_DATA: ListItemData.ActionData
                            , LIST_KEY: ListData.Name
                            , CALLBACK: iOpt.OnDrop
                            , ELEMENT_GROUP: iOpt.elementGroup
                            , B_CHECKED: (ListItemData.bChecked) ? ` IsChecked` : ``
                            , AUTOFOCUS: (ListItemData.bChecked) ? ` autofocus` : ``
                            , ON_CLICK: ListItemData.OnClick || ``
                        });
                    }
                });
                
            }
            
            if(ListData.bUseBreak) ListsOutput += `<br />`;
            ListsOutput += tplList.List.wzReplace({
                HEADER: ListData.Text || ListData.Name
                , LIST_KEY: ListData.Name
                , CALLBACK: iOpt.OnDrop
                , ENTRIES: EntriesOutput
                , ELEMENT_GROUP: iOpt.elementGroup
            });
        });
    
        if(this.InOpt.LegendName !== ``){
            Output = tplList.LegendContainer.wzReplace({
                LEGEND_NAME: this.InOpt.LegendName
                , SEARCH: (iOpt.bHasSearch) ? tplList.SearchField.wzReplace({SEARCH_TERM: iOpt.SearchTerm}) : ``
                , LISTS: ListsOutput
            });
        }else{
            Output = tplList.Container.wzReplace({
                LISTS: ListsOutput
            });
        }
        Output.wzReplace({
        
        });
        
        return Output;
    }
    
}

module.exports = cDragDropList;
