/**
 * Created by WareBare on 3/24/2017.
 */

let aFiles = wzIO.dir_get_contentsSync(`${dirBase}/data`,true),
    aData = {};

for( let $_Index in aFiles){
    if($_Index.includes(`.json`)){
        aData[$_Index.split(`.json`)[0]] = require(`./${$_Index}`);
    }
}

module.exports = aData;
