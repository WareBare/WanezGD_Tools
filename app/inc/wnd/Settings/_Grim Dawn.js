/**
 * Created by WareBare on 4/3/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    title: `Settings :: Grim Dawn`,
    
    forms: {
        gd_settings:false
    },
    submitForm: function($el){
        console.log(`custom submit: ${$el.value}`);
    },
    
    content_: function(){
        let out_ = `Grim Dawn - Settings`;
        
        this.forms.gd_settings = new WZ.Core.cForm({
            id: 'gd_settings',
            title: `Grim Dawn`,
            isWnd: `Settings`,
            onChange: {
                /*custom: `submitForm(this)`*/
            },
            items: {
                'Directories': {
                    'settings-app::GrimDawn.Paths.Working': {
                        label: `Working Directory`,
                        type: `textLargeX`,
                        isRequired: true
                    },
                    'settings-app::GrimDawn.Paths.Game': {
                        label: `Install Directory`,
                        type: `textLargeX`
                    }
                }/*,
                'Mods': {
                    'settings-app::GrimDawn.Paths.Mods': {
                        label: `Mods (Folder, separate folders with new line)`,
                        type: `listArea`
                    },
                    'settings-app::GrimDawn.activeMod': {
                        label: `Active Mod`,
                        type: `comboBox`,
                        data: appConfig.get(`GrimDawn.Paths.Mods`) || []
                    }
                }*/
            }
        });
        out_ = this.forms.gd_settings.create();
        
        //console.log(wzWND('Settings').__getContent().contentType);
        
        return out_;
    }
    
};
