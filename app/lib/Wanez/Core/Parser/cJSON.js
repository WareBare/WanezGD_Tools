/**
 * Created by WareBare on 10/20/2016.
 */

class cJSON extends libWZ.Core.cBase{
    
    constructor(){
        super();
    }
    
    /**
     *
     * @param $fileContents
     */
    parseData($fileContents){
        //return JSON.parse(super.file_get_contents(this.filepath));
        return JSON.parse($fileContents);
    }
    
    /**
     *
     * @param $data
     */
    stringifyData($data){
        return JSON.stringify($data, null, 4);
    }
}

module.exports = cJSON;
