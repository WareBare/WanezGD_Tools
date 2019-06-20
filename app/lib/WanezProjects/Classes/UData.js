/**
 * @extends UObject
 */
class UData extends require(`./UObject`){

    constructor(){
        super();

        super.TestMethod();

        /** @private New property to test doc */
        this.NewProp = false;
    }

    /**
     * @private Parses internal data, called from constructor.
     */
    ParseData(){
        // ---
    }



}

module.exports = UData;
