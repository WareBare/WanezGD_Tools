
const TMap = require(`./TMap`);

module.exports = class TDbrArray extends Array{

    /**
     * 
     * @param {string} InNamePattern ex: {CONSTANT}{KEY}{INDEX}
     * @param {string} InConstant ex: loot -> the string that is always the same.
     * @param {TMap} InGlobals ex: [{Key: `{chanceToEquipMisc1}`, Value: `int {80}`}]
     */
    constructor(InNamePattern, InConstant, InGlobals){
        super();

        /** @private ex: {CONSTANT}{KEY}{INDEX} */
        this.NamePattern = InNamePattern;
        /** @private ex: loot -> the string that is always the same.  */
        this.Constant = InConstant;
        /** @private ex: [{Key: `{chanceToEquipMisc1}`, Value: `int {80}`}] */
        this.Globals = InGlobals;
    }
}
