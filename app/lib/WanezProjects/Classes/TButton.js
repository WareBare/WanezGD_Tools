
const TMap = require(`./TMap`);

module.exports = class TButton extends TMap{

    constructor(InInit){
        super(InInit);
    }

    /**
     * 
     * @param {string} InKey Key. same as TMap
     * @param {Object} InOptions 
     * @param {string} InOptions.Id 
     * @param {string} InOptions.Class 
     * @param {string} InOptions.Text 
     * @param {string} InOptions.Tip 
     * @param {string} InOptions.TipPos 
     * @param {string} InOptions.CallPrefix 
     */
    Add(InKey, InOptions){
        InOptions = Object.assign({
            Id: InKey
            , Class: `DefaultBtn`
            , Text: `Empty`
            , Tip: false
            , TipPos: `top`
            , CallPrefix: `_cms.`
        }, InOptions);

        let newValues = {
            TEXT: InOptions.Text
            , ELEMENT_CLASS: InOptions.Class
            , FN_ONCLICK: `${InOptions.CallPrefix}OnClickBtn_${InKey}(this);`
        };

        if(InOptions.Tip && InOptions.Tip !== ``){
            newValues[`TOOL_TIP`] = ` data-wztip='${InOptions.Tip}' data-wztip-position="${InOptions.TipPos}"`;
        }
        if(InOptions.Id && InOptions.Id !== ``){
            newValues[`ELEMENT_ID`] = ` id="${InOptions.Id}"`;
        }

        let entryIndex = super.Add(InKey, newValues);

        //Log(this[entryIndex].Value);
    }

    MakeOutput(){
        let outStr = ``
            , tplBtn = `<span{ELEMENT_ID} class="{ELEMENT_CLASS}"{TOOL_TIP} onclick="{FN_ONCLICK}">{TEXT}</span>`;

        // ---
        this.ForEach( (It) => {
            outStr += tplBtn.wzReplace(It.Value);
        } );

        return outStr;
    }

}
