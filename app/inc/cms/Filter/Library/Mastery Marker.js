/**
 * Created by WareBare on 12/05/2019.
 */

module.exports = {
    SubPageName: `Library`,
    Forms: {},
    tplContent: {},

    

    Init: function()
    {
        /// ---
    },

    OnSaveTagData: function()
    {
        Super.ReplaceClassData(`ImportantTags`, this.TagData);
    },

    OnClickCheckBox_bEnableClassNames: function(InEl)
    {
        appConfig.set(`Filter.bEnableClassNames`, InEl.checked);

        wzReloadCMS(10);
    },

    OnChangeColor_MasteryColor: function(InEl, InMasteryTag)
    {
        if(InEl.value === `Clear`){
            delete this.TagData.Masteries[InMasteryTag];
        }else{
            this.TagData.Masteries[InMasteryTag] = InEl.value;
        }
        
        wzReloadCMS(10);
    },

    CreateColorPicker: function(InMasteryTag)
    {
        let outStr = ``;

        outStr += Super.MakeColorPicker(Super.GetMasteryNames()[InMasteryTag], InMasteryTag, this.TagData.Masteries[InMasteryTag] || `Clear`, false, `_cms.OnChangeColor_MasteryColor(this, '${InMasteryTag}')`);

        return outStr;
    },

    MakeContent_Color: function()
    {
        let outStr = ``
            , outForm_01 = ``
            , masteryNames = Super.GetMasteryNames();

        if (!masteryNames) return Super.tplContent.FormContainer.wzReplace({
            TITLE: `Coloring Options`
            , CONTENTS: `Generating Data...`
        });

        for (const kMasteryTag in masteryNames) {
            if (masteryNames.hasOwnProperty(kMasteryTag)) {
                const elMasteryName = masteryNames[kMasteryTag];
                outForm_01 += this.CreateColorPicker(kMasteryTag);
            }
        }

        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `Coloring Options`
            , CONTENTS: `${outForm_01}`
        });

        return outStr;
    },

    MakeContent_General: function()
    {
        let outStr = ``
            , outForm_01 = ``;

        /// ---
        outForm_01 += Super.tplContent.CheckBoxWithTip.wzReplace({
            ON_CLICK_FN: `_cms.OnClickCheckBox_bEnableClassNames(this)`
            , LABEL: `Enable Mastery Names`
            , B_CHECKED: (appConfig.get(`Filter.bEnableClassNames`)) ? ` CHECKED` : ``
            , TOOL_TIP: `<ul><li>When enabled this will show Mastery Names after Skill Names.</li><li>Color Settings are always applied (use Clear if you do not want a color).</li></ul>`
        });

        outStr += Super.tplContent.FormContainer.wzReplace({
            TITLE: `General Options`
            , CONTENTS: `${outForm_01}`
        });

        return outStr;
    },

    content_: function(InContentType)
    {
        this.contentType = InContentType || this.contentType || `Default`;
        
        let Output = ``;

        if(!this.TagData){
            this.TagData = Super.GetClassData(`ImportantTags`, false);
            this.TagData.Masteries = this.TagData.Masteries || {};
        }
        this.OnSaveTagData();

        if (!Super.GetMasteryNames()){
            wzReloadCMS(250);
        }

        switch (this.contentType) {
            default:
                Output += this.MakeContent_General();
                Output += this.MakeContent_Color();
                break;
        }
        
        return Output;
    },
    
    sidebarBtns_: function()
    {
        let outButtons = Super.sidebarBtns_();

        // ---

        return outButtons;
    },
    sidebarList_: function()
    {
        let outButtons = {};

        outButtons[`Default`] = {
            text: `Complete Overview`
        };

        // Enable if no list is shown.
        outButtons = {};

        return outButtons;
    }
    
};
