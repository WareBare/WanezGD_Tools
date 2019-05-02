/**
 * Created by Ware on 1/13/2019.
 *
 * @author Ware (Daniel Kamp)
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
            , OnDrop: `` // Callback function name inside _cms
            , bHasSearch: true
            , SearchTerm: ``
            , Lists: [{
                Name: `Unset`
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
            , List: `<div class="List"><div class="Header">{HEADER}</div><div class="Content" wz-listKey="{HEADER}" ondrop="_cms.{CALLBACK}(event)" ondragover="(function(e){e.preventDefault();})(event)">{ENTRIES}</div></div>`
            , EntryField: `<div class="EntryField" draggable="true" ondragstart="(function(e){e.target.style.opacity = '0.2';e.dataTransfer.setData('ActionData', '{ACTION_DATA}');e.dataTransfer.setData('ListKey', '{LIST_KEY}');})(event)">{TEXT}</div>`
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
                    if(ListItemData.Text && ListItemData.ActionData){
                        EntriesOutput += tplList.EntryField.wzReplace({
                            TEXT: ListItemData.Text
                            , ACTION_DATA: ListItemData.ActionData
                            , LIST_KEY: ListData.Name
                        });
                    }
                });
                
            }
            
            if(ListData.bUseBreak) ListsOutput += `<br />`;
            ListsOutput += tplList.List.wzReplace({
                HEADER: ListData.Name
                , CALLBACK: iOpt.OnDrop
                , ENTRIES: EntriesOutput
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
