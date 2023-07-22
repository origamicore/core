import { HttpMethod } from "../models/extrnalService";
import ModelService, { ObjectModel } from "./modelService";

export class ParamModel{
    index:number;
    type:'session'|'input'|'odata';
    isRequired:boolean;
    classType:any=null;
    basicType:any=null;
    isArray:boolean=false;
    public constructor(
        fields?: { 
          index?: number
          type?:'session'|'input'|'odata'
          isRequired?: boolean
          classType?:any
          basicType?:any
          isArray?:boolean
        }) {
        if (fields) Object.assign(this, fields);
    }
}
// type NewType = HttpMethod;

export class FunctionOption
{
    route:string='';
    service:string='';
    isInternal:boolean;
    isPublic:boolean;
    roles: number[] ;
    maxUploadSize:number;
    method:HttpMethod
    public constructor(fields?: {  
        service?: string
        isInternal?:boolean
        isPublic:boolean
        method:HttpMethod
        roles?: number[] 
        maxUploadSize?:number
        route:string;
      }) {
        if (fields) Object.assign(this, fields);
    }
}
export class FunctionModel{
    name:string='';
    option:FunctionOption;
    params:Map<number,ParamModel>=new Map<number,ParamModel>();
    public constructor(fields?: { 
        name?: string,  
      }) {
        if (fields) Object.assign(this, fields);
    }

    addParamData( param:ParamModel)
    { 
        if(!this.params.has(param.index)  )this.params.set(param.index,param)   ;
    }
    setOption( option:FunctionOption)
    {
        this.option=option;
    }
}


export default class Container{
    functions:Map<string,FunctionModel>=new Map<string,FunctionModel>();
    setFunction(functionName:string,option:FunctionOption)
    {
        if(!this.functions[functionName])this.functions[functionName]=new FunctionModel({name:functionName});
        (this.functions[functionName] as FunctionModel).setOption(option); 
    }
    addParamData(functionName:string,param:ParamModel)
    {
        if(!this.functions[functionName])this.functions[functionName]=new FunctionModel({name:functionName});
        (this.functions[functionName] as FunctionModel).addParamData( param); 
    }
}


export class ModelProps
{
    name:string
    readOnly:string
    title:string
    tags:string[]|string
    minLength: number   
    maxLength: number   
    ignoreToJson:boolean
    isRequired:boolean 
    type:string;
    constructor(name:string,fields?: { 
        readOnly?:string
        title?:string
        tags?:string[]|string
        minLength?: number   
        maxLength?: number   
        ignoreToJson?:boolean
        isRequired?:boolean 
        type?:string
      })
    {
        this.name=name;
        if(fields)Object.assign(this,fields)
    }
}
export class ModelContainer
{
    static props:ModelProps[]=[];
    static addProp(props:ModelProps)
    {
        this.props.push(props);
    }
    static addModel(className:string)
    {
        ModelService.models[className]=new ObjectModel({name:className,props:this.props}); 
        this.props=[]
    }
}