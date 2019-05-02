/**
 * Created by WareBare on 3/24/2017.
 */

module.exports = class cFormWeb extends libWZ.Core.cBase{
    
    constructor($id,$data){
        super();
        
        this.formId = $id;
        this.formData = $data || {};
        
        this.formTLP = this.appData.forms[this.formId];
        this.formSettings = this.formTLP.settings;
        this.formItems = this.formTLP.items;
    
        this.formConfig = ($data) ? false : new eConfig({name: this.formSettings.configFile});
        if(this.formConfig){
            this.formData = this.formConfig.get(this.formSettings.configKey);
            //console.log(this.formData);
        }
        
        this.form_ = 'No Form Created!';
        // create form
        //this.createForm();
    }
    
    
    /**
     * converts the string (field-name) into an object with dataName(MySQL Table) and fields(MySQL columns)
     * @param {string} $fieldName
     * @return {*[]}
     */
    convertNameToObject($fieldName){
        let split01 = $fieldName.split("::"),
            dataName = split01[0],
            fields = split01[1].split("-");
        
        return [dataName,fields];
    }
    
    /**
     * declare this.form_
     *
     * separate method in case the form needs to be recreated
     */
    createForm(){
        this.form_ = this.create_();
    }
    
    
    /**
     *
     * @param {string} $fieldName
     * @return {*}
     */
    fetchFieldValue($fieldName){
        let value_= false;
        //return false;
        try{
            let fieldData = this.convertNameToObject($fieldName),
                value_ = (this.formConfig) ? this.formConfig.get(this.formSettings.configKey) : this.formData[fieldData[0]].getData();
            
            for( let $_key in fieldData[1] ){
                value_ = value_[fieldData[1][$_key]];
            }
            return value_;
        }catch (e){
            console.warn('Form-Field Error fetching Field-Value');
            return value_;
        }
        //return value_;
    }
    
    /**
     *
     * @return {string} Form
     * @private
     */
    create_(){ // $id,$aItems
        let formId = this.formId,
            items_,groups_ = '',aForm,iItems,
            buttons_ = '<input type="submit" value="Submit" /> <input type="reset" value="Reset" />',
            multiFields = ['ListArea','TextLong'];
        const aSettings = this.formSettings || {},
            method_ = 'POST',
            aItems = this.formItems,
            type = aSettings.Type || 'Default',
            tmpGroup = this.appData.tpl.Form.Container[type].Group,
            // get max amount of fields per row
            maxFieldsPerRow = aSettings.FieldsPerRow || 2;
        
        // Parse Groups
        for( let $_Group in aItems ){
            // Parse GroupItems
            items_ = '';
            iItems = 0;
            for( let $_fieldName in aItems[$_Group] ){
                if(iItems == maxFieldsPerRow){
                    items_ += '<br />';
                    iItems = 0;
                }
                if(aItems[$_Group][$_fieldName]){
                    items_ += this.addField(aItems[$_Group][$_fieldName][0],$_fieldName,aItems[$_Group][$_fieldName][1],this.fetchFieldValue($_fieldName)); // ,'value'
                }
                // add counter if larger field
                for( let $_i in multiFields ){
                    if(multiFields[$_i] == aItems[$_Group][$_fieldName][0]) iItems++;
                }
                iItems++;
            }
            //if(groups_ != '') groups_ += '<br />';
            groups_ += tmpGroup.wzOut({
                "ID": formId+'::'+$_Group,
                "TITLE": $_Group,
                "ITEMS":items_
            });
        }
        
        aForm = {
            "ID": formId,
            "CLASS": '',
            "METHOD": method_,
            "TITLE": aSettings.Name || 'New Form',
            "GROUPS": groups_,
            "BUTTONS": buttons_
        };
        
        return super.create_(this.appData.tpl.Form.Container[type].Frame,aForm);
    }
    
    addField($type,$name,$opt,$value){
        $value = $value || null; //  || null
        //noinspection JSUnresolvedFunction
        $opt = wzSetArDef($opt,{
            'ID':'',
            'CLASS':'',
            'NAME': $name,
            'TEXT':'',
            'VALUE': false, // false will result in an empty string (value/checked not set)
            'DEFAULT': false,
            'REQUIRED': true,
            'Data': false,
            "ITEMS": '',
            "WZ_TYPE": 'wzType="'+$type+'"'
        });
        
        if($opt.ID != '') $opt.ID = ' id="{0}"'.wzOut([$opt.ID]);
        if($opt.CLASS != '') $opt.CLASS = ' class="{0}"'.wzOut([$opt.CLASS]);
        $opt.REQUIRED = ($opt.REQUIRED) ? ' required' : '';
        
        // VALUE - overwrite $opt.VALUE if $value is set correctly
        if($value != '' && $value != null) $opt.VALUE = $value;
        else $opt.VALUE = $opt.DEFAULT;
        // ComboBox DATA
        // interrupt VALUE to set ComboBox data and default, otherwise it would not work
        if($opt.Data){
            let tmpCB_Item = '<option value="{VALUE}"{SELECTED}>{TEXT}</option>';
            
            let dataCB = (typeof $opt.Data === 'string') ? this.fetchFieldValue($opt.Data) : $opt.Data;
            
            $opt.ITEMS = '';
            for( let $_Value in dataCB ){
                $opt.ITEMS += tmpCB_Item.wzReplace({
                    'VALUE':$_Value,
                    'TEXT':dataCB[$_Value],
                    'SELECTED': ($_Value == $opt.VALUE) ? ' selected' : ''
                });
            }
            $opt.VALUE = false;
        }
        // VALUE - CONTINUE
        // ComboBox values are set, continue determining VALUE
        let tempValue = $opt.VALUE;
        $opt.VALUE = '';
        if(typeof tempValue === 'string'){ // is a string doesn't matter if it's empty
            $opt.VALUE = ' value="'+tempValue+'"';
        }else if(Array.isArray(tempValue)){
            if($type == 'ListArea'){
                let aValues = tempValue;
                //$opt.VALUE = '';
                for( let $_Key in aValues ){
                    if($opt.VALUE != '') $opt.VALUE += '\n';
                    $opt.VALUE += aValues[$_Key];
                }
            }
        }else if(tempValue === true) { // checkbox is checked
            $opt.VALUE = ' checked';
        }else{
            $opt.VALUE = '';
        }
        
        return this.appData.tpl.Form.Fields[$type].wzOut($opt);
    }
    
    /**
     *
     * @param {Boolean} [$recreate] default: false
     * @return {string|*}
     */
    show_($reCreate = true){
        if($reCreate) this.createForm();
        return this.form_;
    }
    
    
    /**
     * Saves the field (used while looping through all form-fields)
     * @see this.convertNameToObject()
     * @param {object} $fieldData field data including .name and .value
     *
     */
    saveField($fieldData){
        // get usable data from the name
        let fieldObject = this.convertNameToObject($fieldData.name),newValue;
        // set new value
        switch ($fieldData.getAttribute('wzType')){
            case 'ListArea':
                newValue = $fieldData.value.split('\n');
                break;
            default:
                newValue = $fieldData.value;
                break;
        }
        // edit Array (JSON Object)
        //this.formData[fieldObject[0]].editData(fieldObject[1],newValue);
        //console.log(`${fieldObject[1]} - ${newValue}`);
        if(this.formConfig){
            this.formConfig.set(`${this.formSettings.configKey}.${fieldObject[1]}`.replace(`,`,`.`),newValue);
        }else{
            this.formData[fieldObject[0]].editData(fieldObject[1],newValue);
        }
        
        return true;
    }
    
    /**
     *
     * @param $form
     * @return {boolean}
     */
    validateForm($form){
        for( let $_field in $form ){
            if($form[$_field] && $form[$_field].name && typeof $form[$_field].value != "undefined"){
                //console.log($form[$_field].name + ' - ' + $form[$_field].value + ' - '+ $form[$_field].getAttribute('wzType'));
                // save data to object (not file)
                if(!this.saveField($form[$_field])) return false;
            }
        }
        for( let $_formKey in this.formData ){
            //this.formData[$_formKey].printData();
            if(!this.formConfig) this.formData[$_formKey].saveData();
            //console.log(this.formData[$_formKey]);
        }
        return true;
    }
    /*
     static validateForm($event,$form){
     $event.preventDefault();
     
     
     
     }
     */
}
