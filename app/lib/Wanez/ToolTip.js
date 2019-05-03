/**
 * Creates ToolTip for Elements with data-wztip attribute, using value inside same attr.
 */


let ActiveToolTip = false;

let GetMedianVector2D = function(InA, InB, InC){
    //
    //Log(InA); Log(InB); Log(InC);
    return ((parseInt(InA) + (parseInt(InB) / 2 ))) - (parseInt(InC) / 2);
};

let MakeToolTip = function(e, el, InPositionType = false){
    let tipText = el.getAttribute(`data-wztip`).replace(/(\r\n|\r|\n)/g, `<br />`) // replace \r\n with <br />
        , tplContainer = ``
        , viewportOffset = el.getBoundingClientRect();

    InPositionType = InPositionType || el.getAttribute(`data-wztip-position`);

    if(ActiveToolTip) return false;

    ActiveToolTip = document.createElement(`div`);
    document.body.appendChild(ActiveToolTip);

    ActiveToolTip.setAttribute(`class`, `WzToolTip ${InPositionType || `default`}`);
    ActiveToolTip.innerHTML = tipText;

    // position based on element
    switch (InPositionType) {
        case `top`:
            ActiveToolTip.style.top = `${viewportOffset.top - 10 - ActiveToolTip.scrollHeight}px`;
            ActiveToolTip.style.left = `${GetMedianVector2D(viewportOffset.left, el.scrollWidth, ActiveToolTip.scrollWidth)}px`;
            break;
        case `bottom`:
            ActiveToolTip.style.top = `${viewportOffset.bottom + 10}px`;
            ActiveToolTip.style.left = `${GetMedianVector2D(viewportOffset.left, el.scrollWidth, ActiveToolTip.scrollWidth)}px`;
            break;
        case `right`:
            ActiveToolTip.style.top = `${GetMedianVector2D(viewportOffset.top, el.scrollHeight, ActiveToolTip.scrollHeight)}px`;
            ActiveToolTip.style.left = `${viewportOffset.right + 10}px`;
            break;
        case `left`:
            ActiveToolTip.style.top = `${GetMedianVector2D(viewportOffset.top, el.scrollHeight, ActiveToolTip.scrollHeight)}px`;
            ActiveToolTip.style.left = `${viewportOffset.left - 10 - ActiveToolTip.scrollWidth}px`;
            break;
        default: // on cursor
            ActiveToolTip.style.top = `${e.clientY}px`;
            ActiveToolTip.style.left = `${e.clientX}px`;
            break;
    }
    //Log(tipText);
};
let DeleteToolTip = function(e, el){
    if(!ActiveToolTip) return false;

    ActiveToolTip.remove();
    // clear var to allow new tooltip creation.
    ActiveToolTip = false;
};

module.exports = {

    Init: function(){
        let elements = document.querySelectorAll(`[data-wztip]`);
    
        for(let i = 0; i <= elements.length - 1; i++){
            //currentElement = elements[i];
            //Log(currentElement);
            if(!elements[i].getAttribute(`data-wztip-set`)){
                elements[i].addEventListener(`mouseover`, function(event){
                    MakeToolTip(event, elements[i]);
                });
                elements[i].addEventListener(`mouseleave`, function(event){
                    DeleteToolTip(event, elements[i]);
                });
                elements[i].setAttribute(`data-wztip-set`, `true`);
            }else{
                Log(`was set before`);
            }
            
        }
    
        //Log(elements);
    }

}

