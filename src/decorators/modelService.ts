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
}
export default class ModelService
{
    static models:Map<string,ObjectModel>=new Map<string,ObjectModel>();
    static  getModel(name:string):ObjectModel
    {
        return this.models[name] as ObjectModel
    }
    static validateObject(name:string,value:any):string[]|true
    {
        var error:any[]=[]; 
        var model=this.models[name] as ObjectModel ;  
        
        if(!model)return [];
        for(var prop of model.props)
        {
            var val=value[prop.name]
            if(prop.isRequired)
            {
                var title=prop?.title??prop.name; 
                if(val==null || (typeof(val)=='string' && val===''))error.push({title,type:'required'} ); 
            }
            error.push(...this.vaidateProp(prop,val,prop.name))
        }
        if(error.length)
            return error;
        return true;
    }
    static validate(name:string,propertyKey:string,newVal:any):any[]
    {
        var model=this.models.get(name) ;
        if(!model)return [];
        var field=model.props.filter(p=>p.name==propertyKey)[0];
        if(!field)return [];
        return this.vaidateProp(field,newVal,propertyKey);
    }
    static vaidateProp(field:ModelProps,newVal:any,propertyKey:string):any[]
    {
        var error=[]; 
        if(field?.minLength!=null && (newVal??'').toString().length < field?.minLength) {
            var title=field?.title??propertyKey; 
            error.push({title,type:'minLength'})
        }
        else if(field?.maxLength!=null && (newVal??'').toString().length > field?.maxLength) {
            var title=field?.title??propertyKey;
            error.push({title,typeof:'maxLength'})
        } 
        return error;

    }
}