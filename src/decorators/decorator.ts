import ArgModel from "../models/argModel";
import ExtrnalService, { HttpMethod } from "../models/extrnalService";
import InternalService from "../models/internalService";
import Router from "../router/router";
import Container, { FunctionModel, FunctionOption, ModelContainer, ModelProps, ParamModel } from "./container"; 
import ModelService from "./modelService";
import ExtraData from "./validation/extraData";
import IOriModel from "./validation/iOriModel";
import 'reflect-metadata'


var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}



var container:Container=new Container();
export  function OdataInput (target: Object, propertyKey: string , parameterIndex: number) { 
    container.addParamData(propertyKey,new ParamModel({
        index:parameterIndex,
        type:'odata'
    })) 
}
export  function SessionInput (target: Object, propertyKey: string , parameterIndex: number) { 
    container.addParamData(propertyKey,new ParamModel({
        index:parameterIndex,
        type:'session'
    })) 
}

export function DataInput(fields?: { 
    service?: string,  
    isRequired?:boolean
    isArray?:boolean
    classType?:any
    basicType?:any
  })
{
    return function (target: Object, propertyKey: string, parameterIndex: number) { 
        var func:any=target[propertyKey] as Function;
        type types = Parameters<typeof func>;
        var a={} 
        container.addParamData(propertyKey,new ParamModel({
            index:parameterIndex,
            type:'input',
            isRequired:fields?.isRequired,
            classType:fields?.classType,
            basicType:fields?.basicType,
            isArray:fields?.basicType,
        }))
    }

}
export function OriService(fields?: {
   // domain?: string,
    route?:string;
    service?: string, 
    isInternal?:boolean,
    isPublic?:boolean,
    roles?: number[] 
    maxUploadSize?:number
    method?:HttpMethod
  }) { 
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {  
 
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyKey)
        if(paramTypes)
        {
            var s = paramTypes.map(a => a) ;  
            let functionParameters= getParamNames(target[propertyKey] );
            for(let index=0;index< functionParameters.length;index++)
            {
                let name=functionParameters[index]
                let paramTypeName=s[index].name;
                
                let basicType:any;
                let manualType:any; 
                if(paramTypeName=='Array'||paramTypeName=='Object')
                {
                    //TODO
                }
                else if(paramTypeName=='Number' || paramTypeName=='Boolean'|| paramTypeName=='String'|| paramTypeName=='Date')
                {
                    basicType=s[index];  
                } 
                else  
                {
                    manualType=s[index]
                }
                
                container.addParamData(propertyKey,new ParamModel({
                    index:index,
                    type:'input',
                    //isRequired:fields?.isRequired,
                    classType:manualType,
                    basicType
                })) 
            }

        }
        else
        {
            console.log('Service Type Warning');
        }
        container.setFunction(propertyKey,new FunctionOption(fields as any));         
    };
}
interface Type<T> {
    new (...args: any[]): T;
  }
  
export default function OriInjectable(fields: {
    domain: string, 
  }) {
    return function <T>(target: Type<T>) {
        var myclass=new target();
        
        for(var funcId in container.functions)
        {
            var func= container.functions[funcId] as FunctionModel; 
            if(!myclass[func.name])continue;
            var fstr=myclass[func.name].toString();
            var start=fstr.indexOf('(')
            var end=fstr.indexOf('\n')
            var fInterface=fstr.substr(start,end-start);
            if(fInterface.indexOf('=')!=-1)
            {
                throw `${func.name} : you can't use default value`
            }
            start=fInterface.indexOf('(') 
            fInterface=fInterface.substr(start+1,fInterface.indexOf(')')-start-1) 
            var params=fInterface.split(',')
            var paramList:ArgModel[]=[];
            for(var param of params)
            {
                paramList.push(new ArgModel({name:param.trim()}))
            } 
            func.params.forEach((pmodel:ParamModel,fparam:number)=>{
 
                if(pmodel.type=='session')paramList[pmodel.index].isSession=true;
                if(pmodel.type=='odata')paramList[pmodel.index].isOdata=true;
                if(pmodel.classType)paramList[pmodel.index].type= pmodel.classType ; 
                if(pmodel.basicType)paramList[pmodel.index].basicType= pmodel.basicType ; 
                if(pmodel.isArray)paramList[pmodel.index].isArray= pmodel.isArray ; 
            }) 
            if(func.option.isInternal)
            {
                var service=func.name;
                if(func.option.service)service=func.option.service;
                Router.addInternalRoute(fields.domain,service,new InternalService({
                    functionName:func.name,
                    args:paramList
                }) )
            }
            else
            {
                var service=func.name;
                if(func.option.service)service=func.option.service;
                Router.addExternalRoute(fields.domain,service,new ExtrnalService({
                    functionName:func.name,
                    isPublic:func.option.isPublic,
                    maxUploadSize:func.option.maxUploadSize,
                    roles:func.option.roles, 
                    args:paramList,
                    method:func.option.method,
                    route:func.option.route
                }))

            }
        } 
        container=new Container();
    };
  }


export function OriModel(fields?: {
     
  }) {
    return function <T>(target: Type<T>) {
        ModelContainer.addModel(target.name);
    };
  }
 

export function OriProps(fields?: { 
    readOnly?:string
    title?:string
    tags?:string[]|string
    minLength?: number  
    minLengthError?:string
    maxLength?: number  
    maxLengthError?:string
    ignoreToJson?:boolean
    isRequired?:boolean
    isRequiredError?:string
    type?:string
  })
{
    return function(target: Object, propertyKey: string) { 
        var t = Reflect.getMetadata("design:type", target, propertyKey);
        // console.log('-----------------------', target, propertyKey);
        // console.log('-----------------------', t?.name  );
        if(!t)console.log('type warning');
        
        if(!fields)fields={};
        fields.type=t?.name;
        if(propertyKey.indexOf('$ori')==0)
        {
            throw 'you can\'t use $ori ';
        } 
        ModelContainer.addProp(new ModelProps(propertyKey,fields));
        
        if(fields?.tags)
        {

            if(!target['$oriExtraData'])
            {
                target['$oriExtraData']=new ExtraData()
            }
            if(Array.isArray(fields.tags))
            {
                for(var tag of fields.tags)
                {
                    target['$oriExtraData'].addTag(tag,propertyKey) 
                    
                }
            }
            else
            {
                target['$oriExtraData'].addTag(fields.tags,propertyKey) 
            }
        } 
        if(fields?.readOnly)
        {
            Object.defineProperty(target, propertyKey, {
                get: function() {
                    return  this.$oriValues[fields.readOnly];
                } 
            }); 
            return
        }
        const getter = function() {
            return  this.$oriValues[propertyKey];
        };
        const setter = function(newVal: any) {  
            var errors = ModelService.validate(this.constructor.name,propertyKey,newVal);
            var model=this as IOriModel; 
            for(var error of errors)
            {
                model.$oriExtraData.SetValiadte(propertyKey,error);
            }
            
            if(!errors.length)
            {
                model.$oriExtraData.SetValiadte(propertyKey,'') 
                this.$oriValues[propertyKey] = newVal; 
            } 
        }; 
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        }); 
    }

}