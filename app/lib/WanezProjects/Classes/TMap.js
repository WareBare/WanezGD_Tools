/**
 * Extension for Array, copying UE4 TMap
 * using Key-Value pairs for most operations.
 * since the first letter of a method is capitalized it won't conflict with native methods.
 * a reason to make this is, because it can be expanded at any time, if I had a key-value pair object I'd have to change the code if I wanted to add any additional information.
 * 
 */

module.exports = class TMap extends Array{
    /**
     * 
     * @param {Array} InInit Init data, Array with Array containing [Key,Value]
     */
    constructor(InInit){
        super();
        
        if(InInit){
            for(let i = 0; i < InInit.length; i++){
                this.Add(InInit[i][0], InInit[i][1]);
            }
        }
    }

    /**
     * Get the Value from Key.
     * @param {number|string} InKey key to find to return value from.
     * 
     * @returns {string|Array|boolean} Value result.
     */
    Find(InKey){
        let foundResult = this[this.FindIndex(InKey)];

        return (foundResult) ? foundResult.Value : foundResult;
    }


    /**
     * Adds new Value to either an existing Key or adds a new entry with the Key (this overwrites the old Value).
     * @param {string} InKey Key to insert.
     * @param {string} InValue value to set, for key.
     * @param {boolean} bReturnOldValue returns old value instead of index.
     * @param {boolean} bInNotifyByOverride writes log when value was replaced.
     * 
     * @returns {number} Index of entry
     */
    Add(InKey, InValue, bReturnOldValue = false, bInNotifyByOverride = false){
        let entryIndex = this.FindIndex(InKey)
            , outResult = (bReturnOldValue) ? this[entryIndex] : entryIndex;

        if(entryIndex === -1){
            outResult = this.push({
                Key: InKey
                , Value: InValue
            }) - 1;
            //if(bReturnOldValue) entryIndex = this[entryIndex + 10];
        }else{
            if(bReturnOldValue) outResult = this[entryIndex].Value;
            if(bInNotifyByOverride) {
                //Log(`we here`);
                console.info(`${InKey} - OldValue: ${this[entryIndex].Value} - NewValue: ${InValue}`);
            }
            //console.info(`${InKey} - OldValue: ${this[entryIndex].Value} - NewValue: ${InValue}`);
            this[entryIndex].Value = InValue;
        }

        return outResult;
    }

    /**
     * Adds Value to an array of Values for specified Key.
     * @param {string} InKey Key to find
     * @param {string} InValue value to add
     */
    AddAsArray(InKey, InValue){
        let entryIndex = this.FindIndex(InKey);

        if(entryIndex === -1){
            entryIndex = this.push({
                Key: InKey
                , Value: [InValue]
            }) - 1;
        }else{
            if(!this[entryIndex].Value.includes(InValue)){
                this[entryIndex].Value.push(InValue);
            }
        }

        return entryIndex;
    }

    AddByValue(InValue){
        let entryIndex = this.findIndex( x => x.Value === InValue);

        if(entryIndex === -1){
            this.push({
                Key: this.length
                , Value: InValue
            });
        }
    }


    /**
     * Inserts all elements from another TMap to this TMap.
     * @param {TMap} InData data to append to this TMap.
     * @param {boolean} bInUseValue will use .AddByValue() instead of .Add()
     */
    Append(InData, bInUseValue = false){
        InData.ForEach( (It) => {
            if(bInUseValue){
                this.AddByValue(It.Value);
            }else{
                this.Add(It.Key, It.Value);
            }
            
        } );
    }

    /**
     * We can check if a particular key exists.
     * @param {number|string} InKey key to check.
     * 
     * @returns {boolean} TRUE if key exists, FALSE if key does not exist.
     */
    Contains(InKey){
        let bOutHasKey = false
            , entryIndex = this.FindIndex(InKey);

        if(entryIndex !== -1) bOutHasKey = true;
        
        return bOutHasKey;
    }

    /**
     * Finds entry, if no entry was found a new one with that key is created.
     * @param {number|string} InKey Key to find.
     */
    FindOrAdd(InKey){
        let entryIndex = this.FindIndex(InKey);

        if(entryIndex === -1){
            entryIndex = this.Add(InKey, ``);
        }

        return this[entryIndex];

    }

    FindIndex(InKey){
        return this.findIndex( x => x.Key === InKey);
    }


    Remove(InKey){
        let bOutSuccess = false
            , entryIndex = this.FindIndex(InKey);

        if(entryIndex !== -1){
            this.splice(entryIndex, 0);
            bOutSuccess = true;
        }

        return bOutSuccess;
    }

    Empty(){
        this.splice(0, this.length - 1);
    }

    /**
     * 
     * @param {function} InCallback function to execute.
     */
    ForEach(InCallback){

        for(let i = 0; i < this.length; i++){
            InCallback(this[i]);
        }

    }

    ToArray(){
        let outData = [];

        this.ForEach( (It) => {
            // ---
            outData.push([
                It.Key
                , It.Value
            ]);
        } );

        return outData;
    }

    From(InData){
        for(let i = 0; i < InData.length; i++){
            this.push(InData[i]);
        }
    }

}
