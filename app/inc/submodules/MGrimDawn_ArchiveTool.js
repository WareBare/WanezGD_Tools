
const RunArchiveTool = function(InPath_Source, InPath_Target, InPaths, InCallbackFnPtr)
{
    let archiveMode;
    const allSubDirectories = {
        ARZ: [`database`,`gdx1/database`, `gdx2/database`]
        , ARC: [`resources`, `gdx1/resources`, `gdx2/resources`, `gdx3/resources`]
        , Locale: [`aom`, `fg`, `foa`]
    };
    let subDirectories;
    let localeSubDirectories;
    let bErrorOccured = false;

    for (let i = 0; i < InPaths.length; i++) {
        const elFileName = InPaths[i];
        if (bErrorOccured) break;
        
        if (elFileName.endsWith(`.arc`)){
            archiveMode = `-extract`;
            subDirectories = allSubDirectories.ARC;
            localeSubDirectories = allSubDirectories.Locale;
        }else{
            // #ToDo arz/tpl
        }

        // debug
        //bErrorOccured = true;
        for(let j = 0; j < subDirectories.length; j++){
            const elSubDirectory = subDirectories[j];
            if (bErrorOccured) break;
            //break;
            //pathExistsSync

            try{
                if(fs.existsSync(`${InPath_Source}\\${elSubDirectory}\\${elFileName}`)) {
                    
                    let errorMaybe = child_process.execSync(
                        `"${InPath_Source}\\ArchiveTool.exe" "${InPath_Source}\\${elSubDirectory}\\${elFileName}" ${archiveMode} "${InPath_Target}\\resources"`
                        , {
                            //timeout: 10000
                            //, stdio: 'inherit'
                            windowsHide: true
                        }
                    );
                    
                    /*
                    const currentLanguage = appConfig.get('RadioGroupStorage.Language');
                    if (currentLanguage !== `en`)
                    {
                        for(let k = 0; k < localeSubDirectories.length; k++){
                            const elSubDirectory = localeSubDirectories[k];
                            if (bErrorOccured) break;
                            const currentPath = `${InPath_Target}\\resources\\text_${currentLanguage}`;
                            //break;
                            //pathExistsSync
                            console.log(currentPath);

                            if(fs.existsSync(`${currentPath}\\${elSubDirectory}`))
                            {
                                fs.moveSync(`${currentPath}\\${elSubDirectory}`, currentPath, { overwrite: true })
                            }
                            else
                            {
                                bErrorOccured = true;
                            }
                        }
                    }
                    */
                    
                   /*
                    let errorMaybe = child_process.spawnSync(
                        `"${InPath_Source}\\ArchiveTool.exe"`
                        , [`"${InPath_Source}\\${elSubDirectory}\\${elFileName}"`, `${archiveMode}`, `"${InPath_Target}\\resources"`]
                        , {
                            //timeout: 10000,
                            windowsHide: true
                        }
                    );
                    */
                    //console.error(errorMaybe);
                }
            }catch(err){
                console.error(err);
                bErrorOccured = true;
            }
        }
        
        
        
    }



    if(bErrorOccured) console.warn(`Error Exctracting!`);

    InCallbackFnPtr(bErrorOccured); // bErrorOccured
}

module.exports = {
    RunArchiveTool: RunArchiveTool
}
