import ErrorModel from "../models/errorModel";
import { ModelProps } from "./container";

export class ObjectModel
{
    name:string;
    props:ModelProps[]
    public constructor(
        fields: {
            name:string;
            props:ModelProps[]
        }) {
        if (fields) Object.assign(this, fields);
    }
    getError(errors:ErrorModel[])
    {
        let text='';
        for(let error of errors)
        {
            let prop = this.props.filter(p=>p.name==error.title)[0] 
            let title=prop?.title?? error.title
            text =  '['+title+','+error.type+'],'
        }
        return text;
    }
}
export default class ModelService
{
    static models:Map<string,ObjectModel>=new Map<string,ObjectModel>();
    static  getModel(name:string):ObjectModel
    {
        return this.models.get(name)  as ObjectModel
    }
    static getByTag(name:string,tag:string):string[]
    {
        var model=this.models.get(name) as ObjectModel ; 
        return model.props.filter(p=>(Array.isArray(p.tags))?p.tags.indexOf(tag)>-1 : p.tags==tag).map(p=>p.name);
    }
    static validateObject(name:string,value:any):string|true
    {
        var error:string=''; 
        var model=this.models.get(name) as ObjectModel ;  
        
        if(!model)return '';
        for(var prop of model.props)
        {
            var val=value[prop.name]
            if(prop.isRequired)
            {
                var title=prop?.title??prop.name; 
                if(val==null || (typeof(val)=='string' && val===''))error +='['+title+' required],'  ; 
            }
            error+=this.vaidateProp(prop,val,prop.name)
        }
        if(error.length)
            return error;
        return true;
    }
    static validate(name:string,propertyKey:string,newVal:any):string
    {
        var model=this.models.get(name) ;
        if(!model)return '';
        var field=model.props.filter(p=>p.name==propertyKey)[0];
        if(!field)return '';
        return this.vaidateProp(field,newVal,propertyKey);
    }
    static vaidateProp(field:ModelProps,newVal:any,propertyKey:string):string
    {
        let text=''
        var error:ErrorModel[]=[]; 
        if(field?.minLength!=null && (newVal??'').toString().length < field?.minLength) {
            var title=field?.title??propertyKey; 
            text+='['+title+' minLength],' 
        }
        else if(field?.maxLength!=null && (newVal??'').toString().length > field?.maxLength) {
            var title=field?.title??propertyKey;
            text+='['+title+' maxLength],'  
        } 
        return text;

    }
}