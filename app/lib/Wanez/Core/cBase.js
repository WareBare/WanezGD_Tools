/**
 * Created by WareBare on 3/24/2017.
 */

module.exports = class cBase{
    
    constructor(){
        this.appData = appData;
        //console.log(appData);
    }
    
    erroAdd($msg){
        if(!this.erroLog) this.erroLog = [];
        this.erroLog.push = $msg;
    }
    
    // ToDo: send an error email to me
    isErro(){
        if(this.erroLog){
            var e = new Error('dummy');
            var name = e.stack.split('\n')[2].replace(/^\s+at\s+(.+?)\s.+/g, '$1' );
            console.warn(name+' could not be executed!');
            /*
             alert('If you see this, something went wrong, please report:\n'+
             '-> Function.isErro::'+name+'\n'+
             'A log file has been created that you can give to the author of this program, if necessary','isError');
             */
            console.log(this.erroLog);
            return true;
        }
        return false;
    }
    /**
     * @param {int|string} $number the number to parse
     * @param {int} $add the amount of zeroes to place infront of the number
     */
    parseIntToString($number,$add){
        let arr = ['0000','000','00','0',''],$base = 4;
        $number = parseInt($number);
        
        
        return ( ($number <= 9) ? arr[$base - $add]+$number :
            ($number <= 99) ? arr[$base + 1 - $add]+$number :
                ($number <= 999) ? arr[$base + 2 - $add]+$number : $number );
    }
    
    create_($tmp,$aRep,$el = false){
        //if(!this.isErro()){
            return $tmp.wzOut($aRep,$el);
        //}
    }
    
};
