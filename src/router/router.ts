import { IOriModel } from "../..";
import ModelService from "../decorators/modelService";
import ExtrnalService, { HttpMethod } from "../models/extrnalService";
import GlobalModels from "../models/globalModels";
import InternalService from "../models/internalService";
import MessageModel from "../models/messageModel";
import PackageIndex from "../models/packageIndex";
import RouteResponse from "../models/routeResponse";
import UploadModel from "../models/uploadModel";
import OdataModel from "./odataModel";
import RouteErrorMessage from "./routeErrorMessage"; 
import RouteService from "./routeService";
import UploadService from "./uploadService";
 
var globalModel:GlobalModels=new GlobalModels();
if(global.origamicore)
{
  globalModel=global.origamicore as GlobalModels ;
}  
else
{
  global.origamicore=globalModel
}

var routes = globalModel.routes; 


export default class Router
{ 
  //static routes = new Map<String,RouteService>();  
  static getDomains()
  {
    return Array.from(routes.keys() ).map(p=>p+'')
  }
  static getExternalServices(domain:string)
  {
    return Array.from(routes.get(domain).externalServices.keys() ) .map(p=>p+'')

  }
  static getRouteData(domain:string , service:string): ExtrnalService
  {
    if(!routes.get(domain))return null;
    var route= routes.get(domain) ;
    if(!route.externalServices.get(service) )return null;
    return route.externalServices.get(service);
  } 
  static addExternalRoute(domain:string , service:string , data:ExtrnalService)
  {
    if(!routes.get(domain))routes.set(domain,new RouteService());
    routes.get(domain).externalServices.set(service,data)  ; 
  }
  static addInternalRoute(domain:string , service:string , data:InternalService)
  {
    if(!routes.get(domain))routes.set(domain,new RouteService());
    routes.get(domain).services.set(service,data) ;
  }
  static setInstance(index:PackageIndex)
  {
    var domain=index.name;
    if(!routes.get(domain))return null;
    var service=routes.get(domain) 
    service.services.forEach( (value: InternalService) => {
       
      value.function=index[value.functionName]
      value.parent=index;
    }) 
    service.externalServices.forEach((value: ExtrnalService) =>{
       
      value.function=index[value.functionName];
      value.parent=index;
    }) 

  }
  static async runInternal(domain:string ,service:string ,message:MessageModel,event?:(RouteResponse)=>void ):Promise<RouteResponse>
  { 
    
    if(domain==null || !routes.get(domain))
    {
      return new RouteResponse({error: RouteErrorMessage.domainNotExist});
    }  
    if( !routes.get(domain)?.services.get(service))
    {
      return new RouteResponse({error: RouteErrorMessage.serviceNotExist});
    }
    var d=routes.get(domain);
    var s= d?.services.get(service) ;
    if(s==null) return new RouteResponse({error: RouteErrorMessage.serviceNotExist});
    var data:any[]=[];
    for(var arg of s.args)
    { 
      var dt:any=null; 
      if(message.data)
      {
        dt=message.data[arg.name]
      }
      if(arg.isSession)
      {
        dt=message.session;
      }
      if(arg.isEvent)
      {
        dt=(res:any)=>{
            if(res instanceof RouteResponse)
            {
              return event(res) ;
            }
            return event(RouteResponse.success(res)); 
        }
         
      }   
      if(arg.isRequired && !dt)
      { 
        return RouteResponse.failed(null,arg.name+' required','')
      }
      if(dt || arg.isRequired)
      {
        if(arg.type || arg.basicType)
        {
          if(arg.isArray)
          {
            if(!Array.isArray(dt))return RouteResponse.failed({error:validate,name:arg.name},'parameter validation',RouteErrorMessage.validationError)
            let arr= []
            if(arg.type) arr=dt.map(a=>new (arg.type)(a)) ; 
            else arr=dt.map(a=>  (arg.basicType)(a));
            
            dt=arr;
          }
          else
          {
            
            if(arg.type) dt=new (arg.type)(dt); 
            else dt=(arg.basicType)(dt); 
            if(dt instanceof IOriModel)
            { 
              var validate=  dt.isValid();  
              if(validate!==true)
              {
                return RouteResponse.failed({error:validate,name:arg.name},'parameter validation',RouteErrorMessage.validationError)
              }
              
            }
          }
          
        }
      }
      data.push(dt);

    }
    data.push(s.parent)
    try{
      var res =await  s.parent[s.functionName](...data) ;
      if(res instanceof RouteResponse)
      {
        return res;
      }
      return RouteResponse.success(res);
    }catch(exp){
      return RouteResponse.failed(exp,exp.message,'')
    }
  }
  static async runExternal(domain:string ,service:string ,message:MessageModel,route:string,httpMethod:string ,event?:(RouteResponse)=>void ):Promise<RouteResponse>
  { 
    
    if(domain==null || !routes.get(domain))
    {
      return new RouteResponse({error: RouteErrorMessage.domainNotExist});
    }  
    if( !routes.get(domain)?.externalServices.get(service))
    {
      return new RouteResponse({error: RouteErrorMessage.serviceNotExist});
    }
    var d=routes.get(domain);
    var s= d?.externalServices.get(service);

    var routeData=s.validateRoute(route);
    if(!routeData) return new RouteResponse({error: RouteErrorMessage.serviceNotExist}); 
    for(var param in routeData)
    {
      message.data[param]=routeData[param];
    }
    var method=s.method??globalModel.config.defaultMethod;
    if(method && method!=HttpMethod.None && method!=httpMethod)
    {
      return new RouteResponse({error: RouteErrorMessage.serviceNotExist});
    }
    if(s==null) return new RouteResponse({error: RouteErrorMessage.serviceNotExist});
    var data:any[]=[];
    for(var arg of s.args)
    {
      
      var dt:any=null; 
      if(message.data)
      {
        dt=message.data[arg.name]
      }
      if(arg.isSession)
      {
        dt=message.session;
      }
      if(arg.isOdata)
      {
        dt=new OdataModel(message.data) ;
      }
      if(arg.isEvent)
      {
        dt=(res:any)=>{
            if(res instanceof RouteResponse)
            {
              return event(res) ;
            }
            return event(RouteResponse.success(res)); 
        }
      }
      if(arg.isRequired && !dt)
      { 
        return RouteResponse.failed(null,'['+arg.name+', required],','')
      }
      if(dt || arg.isRequired)
      {
        if(arg.type || arg.basicType)
        { 
          if(arg.isArray)
          {
            if(!Array.isArray(dt))
            { 
              return RouteResponse.failed({error:validate,name:arg.name},'parameter validation',RouteErrorMessage.validationError)
            }
            let arr= []
            if(arg.type) arr=dt.map(a=>new (arg.type)(a)) ; 
            else arr=dt.map(a=>  (arg.basicType)(a));
            
            dt=arr;
          }
          else
          {
            if(arg.type) dt=new (arg.type)(dt); 
            else dt=(arg.basicType)(dt); 
            if(dt instanceof IOriModel)
            { 
              var validate=  dt.isValid();
              if(validate!==true)
              {
                throw validate
                // return  RouteResponse.failed({error:validate,name:arg.name},'parameter validation',RouteErrorMessage.validationError)
              }
              
            }
          }
        }
      }
      data.push(dt);

    }
    data.push(s.parent)
    try{
      var res =await  s.parent[s.functionName](...data) ;
      if(res instanceof RouteResponse)
      {
        return res;
      }
      return RouteResponse.success(res);
    }catch(exp){
      return RouteResponse.failed(exp,exp.message,'')
    }
  }
}