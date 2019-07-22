/**
 * Created by Ware on 05/10/2019.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

const Parsers = require(`./Modules/Parsers.js`);
const GrimDawn = require(`./Modules/GrimDawn`);

// Classes
const Classes = require(`./Classes`);

const _DataPath = `C:/Users/Ware/source/repos/WanezModTools/app/lib/WanezProjects/Json2`;

/**
 * Stores Data from /_Modules/data.json; use GetData() to get it and WriteData() to save.
 */
//let _Data = fs.readJsonSync(`${_DataPath}/data.json`);
//let _Data;

/**
 * [1.5, 1.7] 
 * --> [1.5, 1.7, 1.9, 2.1, 2.3, ...]
 * 
 * [1.5, 1.7, 2.0, 2.2] 
 * --> [1.5, 1.7, 2.0, 2.2, 2.4, 2.7, 2.9]
 * 
 * MakeCurve_Increment([1.5, 1.7, 1.9, 2.2, 2.3], 20);
 * 
 * MakeCurve_Increment([1.5, 1.6, 1.5, 1.7, 1.8], 20);
 * 
 * MakeCurve_Increment([1.5, 1.7, 1.9, 2.2], 20);
 * 
 * MakeCurve_Increment([1.5, 1.7], 20);
 * 
 * @param {Array} InNumbers 
 * @param {Number} InMaxRank max number of entries (Rank/Level for Grim Dawn)
 */
const MakeCurve_Increment = function(InNumbers, InMaxRank){
    let loopNumber;
    let x, y, z;
    let outNumbers = [];

    for(let i = 0; i < InMaxRank; i++){
        // ---
        //loopIncrement
        if(i >= InNumbers.length){
            x = parseFloat(outNumbers[i - 1]);
            y = parseFloat(outNumbers[i - 1]) - parseFloat(outNumbers[i - 2]);
            z = 0;
            
            if(InNumbers.length > 2){
                z = parseFloat(
                    (
                        parseFloat( outNumbers[i - (InNumbers.length - 2)] )
                        - 
                        parseFloat( outNumbers[i - (InNumbers.length - 1)] )
                    )
                    -
                    (
                        parseFloat( outNumbers[i - (InNumbers.length - 1)] )
                        -
                        parseFloat( outNumbers[i - (InNumbers.length)] )
                    )
                );
            }
            
            loopNumber = parseFloat( x + ( z + y ) );
        }else{
            loopNumber = parseFloat(InNumbers[i]);
        }
        outNumbers.push( loopNumber.toFixed(2) );
    }
    //Log(outNumbers);

    return outNumbers;
}
/**
 * 
 * @param {number} InNumber starting number.
 * @param {float} InIncreaseValue increase as float 1.1 is +10% per rank.
 * @param {number} InMaxRank max number of entries to calculate.
 */
const MakeCurve_Increase = function(InNumber, InIncreaseValue, InMaxRank){
    let outNumbers = [InNumber];

    for(let i = 0; i <= InMaxRank; i++){
        outNumbers.push(Math.ceil(outNumbers[i] * InIncreaseValue));
    }

    return outNumbers;
}

/**
 * @module ./_Modules/index
 */
module.exports = {

    /**
     * Returns _Data from /data.json
     * @param {boolean} bInReload - TRUE if data should be reloaded. [default: false]
     * @returns {{}} /data.json as object
     */
    GetData(bInReload = false){
        if(bInReload) _Data = fs.readJsonSync(`${_DataPath}/data.json`);
        return _Data;
    },
    /**
     * Sets _Data for /data.json
     * @param {{}} InNewData data to set _Data with
     */
    SetData(InNewData){
        _Data = InNewData;
    },
    /**
     * Writes _Data to /data.json
     */
    WriteData(){
        fs.outputJsonSync(`${_DataPath}/data.json`, _Data, {spaces: `/t`});
        Log(`Data saved!`);
    },
    UpdateData(InKeys, InValue){

    },

    MakeCurve_Increment,
    MakeCurve_Increase,

    Parsers,
    Classes,
    GrimDawn
}


