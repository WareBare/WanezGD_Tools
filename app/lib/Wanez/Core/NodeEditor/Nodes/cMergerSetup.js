/**
 * Created by Ware on 7/28/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cMergerSetup extends libWZ.Nodes.cBase{

    constructor($config){
        super();
        
        this.iConfig = $config;
        
    }
    
    ini(){
        super.ini();
        
        if(appConfig.has(`Merger.Paths.Sources`)){
            let folders = fs.readdirSync(`${appConfig.get(`Merger.Paths.Sources`)}`);
            console.log(folders);
            for(let $_Index in folders){
                if(fs.lstatSync(`${appConfig.get(`Merger.Paths.Sources`)}/${folders[$_Index]}`).isDirectory()){
                    /*
                    this.nData.push({
                        Node: `ProjectComponent`,
                        Title: folders[$_Index],
                        Output: {
                            Location: {
                                Type: `String`,
                                Value: `${appConfig.get(`Merger.Paths.Sources`)}/${folders[$_Index]}`
                            }
                        }
                    });//[folders[$_Index]]
                    */
                    this.nData.push(Object.assign(JSON.parse(JSON.stringify(this.nDataDefaults)), {
                        Node: `ProjectComponent`,
                        Title: folders[$_Index],
                        Output: {
                            Location: {
                                Type: `String`,
                                Value: `${appConfig.get(`Merger.Paths.Sources`)}/${folders[$_Index]}`
                            }
                        }
                    }));
                }
            }
            
        }
        
    }
    
    ProjectComponent($Title, $Output, $Input){
        let $ret = ``;
    
        $Title = $Title || `No Name`;
        
        $Output = Object.assign({
            Location: false
        },$Output);
        $Input = Object.assign({
        
        },$Input);
        
        if($Output.Location){
            if(this.isEditor){
                // check if Location is set and only continue if it is
                $ret = $Title;
            }else{
                console.log($Output.Location.Value);
            }
        }
        
        return $ret;
    }
    
};
