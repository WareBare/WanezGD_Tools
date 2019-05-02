/**
 * Created by WareBare on 3/29/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    icons: {
        err: `${dirBase}/img/icon_cancel.png`,
        info: `${dirBase}/img/icon_info.png`,
        warn: `${dirBase}/img/icon_warn.png`,
        save: `img/icon_save.png`
    },
    
    err($msg,$title){
        wzWND({
            Title: $title || `ERROR!`,
            Body: $msg || ``,
            Icon: this.icons.err
        },`notify`).show();
    
        log.error(`${$title || `ERROR!`} => ${$msg || ``}`);
    },
    todo($msg){
        console.log(`wzNotify.todo: ${$msg || `An Error Occurred`}`);
    },
    warn($msg,$title){
        //console.log(`wzNotify.warn: ${$msg || `You are warned`}`);
        wzWND({
            Title: $title || `Warning!`,
            Body: $msg || ``,
            Icon: this.icons.warn
        },`notify`).show();
        
        log.warn(`${$title || `ERROR!`} => ${$msg || ``}`);
    },
    
    info($msg,$title){
        wzWND({
            Title: $title || `Information`,
            Body: $msg || ``,
            Icon: this.icons.info
        },`notify`).show();
    },
    
    save($msg,$title){
        wzWND({
            Title: $title || `File Saved!`,
            Body: $msg || ``,
            Icon: this.icons.save
        },`notify`).show();
    
        log.warn(`${$title || `File Saved!`} => ${$msg || ``}`);
    },
    
};
