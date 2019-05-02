/**
 * Created by WareBare on 3/24/2017.
 */

module.exports = {
    file_get_contents($filepath){
        return fs.readFileSync($filepath,'utf-8');
    },
    /**
     *
     * @param $filepath
     * @param $content
     * @param $removeFromPath - string that should be removed from the path for notify
     */
    file_put_contents($filepath,$content,$removeFromPath){
        $removeFromPath = $removeFromPath || ``;
        fs.writeFile($filepath, $content, function(err) {
            if(err) {
                console.warn(err);
                log.error(`${err}`);
            } else {
                wzNotify.save(`${$filepath.replace($removeFromPath,``)}`);
                console.info(`File Saved: ${$filepath.replace($removeFromPath,``)}`);
            }
        });
    },
    dir_get_contents($filePath,$ignoreSubDir){
        $ignoreSubDir = $ignoreSubDir || false;
        let dirContents = {},curPath;
        
        fs.readdir($filePath,function(err,files){
            for( let $_Index in files ){
                curPath = $filePath+'/'+files[$_Index];
                
                if(fs.lstatSync(curPath).isDirectory()){
                    if(!$ignoreSubDir) dirContents[files[$_Index]] = this.dir_get_contents(curPath);
                    //this.readDir(curPath);
                }else{
                    //if(files[$_Index].match(/\.dbr$/)){
                    dirContents[files[$_Index]] = curPath;
                    //}
                    
                }
            }
        });
        return dirContents;
    },
    /**
     * Get all directory contents including subdirectories
     * @param {String} $filePath full path to the directory to check
     * @param {Boolean} [$ignoreSubDir] true will not get subdirectory contents
     * @return {{}}
     */
    dir_get_contentsSync($filePath,$ignoreSubDir){
        $ignoreSubDir = $ignoreSubDir || false;
        let dirContents = {},curPath;
        //console.log(curPath);
        try{
            let files = fs.readdirSync($filePath);
            
            for( let $_Index in files ){
                curPath = $filePath+'/'+files[$_Index];
                
                if(fs.lstatSync(curPath).isDirectory()){
                    if(!$ignoreSubDir) dirContents[files[$_Index]] = this.dir_get_contentsSync(curPath);
                }else{
                    dirContents[files[$_Index]] = curPath;
                }
            }
        }catch(err){
            dirContents = false;
        }
        
        return dirContents;
    }
    
};
