
const TMap = require(`./TMap`);

module.exports = class TMultiMap extends TMap{

    /**
     * 
     * @param {Array} InInit Init data, Array with Array containing [Key,Value]
     */
    constructor(InInit){
        super(InInit);
    }

    /**
     * Adds Value, won't check if Key exists.
     * @param {string} InKey Key to insert.
     * @param {string} InValue value to set, for key.
     * 
     * @returns {number} Index of entry
     */
    Add(InKey, InValue){
        let outResult = this.push({
            Key: InKey
            , Value: InValue
        }) - 1;

        return outResult;
    }
}
