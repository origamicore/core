import { IOriModel } from "../..";
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
  static getRouteData(domain:string , service:string): ExtrnalService
  {
    if(!routes[domain])return null;
    var route=(routes[domain] as RouteService);
    if(!route.externalServices[service])return null;
    return route.externalServices[service] as ExtrnalService;
  } 
  static addExternalRoute(domain:string , service:string , data:ExtrnalService)
  {
    if(!routes[domain])routes[domain]=new RouteService();
    routes[domain].externalServices[service]=data; 
  }
  static addInternalRoute(domain:string , service:string , data:InternalService)
  {
    if(!routes[domain])routes[domain]=new RouteService();
    routes[domain].services[service]=data;
  }
  static setInstance(index:PackageIndex)
  {
    var domain=index.name;
    if(!routes[domain])return null;
    var service=routes[domain] as RouteService
    for(var defsrv in service.services)
    { 
      let serviceOption=service.services[defsrv] as InternalService;
      serviceOption.function=index[serviceOption.functionName]
      serviceOption.parent=index;
    }
    for(var srv in service.externalServices)
    {  
      let serviceOption=service.externalServices[srv] as ExtrnalService;
      serviceOption.function=index[serviceOption.functionName];
      serviceOption.parent=index;
    }

  }
  static async runInternal(domain:string ,service:string ,message:MessageModel ):Promise<RouteResponse>
  { 
    
    if(domain==null || !routes[domain])
    {
      return new RouteResponse({error: RouteErrorMessage.domainNotExist});
    }  
    if( !routes[domain]?.services[service])
    {
      return new RouteResponse({error: RouteErrorMessage.serviceNotExist});
    }
    var d=routes[domain] as RouteService;
    var s= d?.services[service] as InternalService;
    if(s==null) return new RouteResponse({error: RouteErrorMessage.serviceNotExist});
    var data:any[]=[];
    for(var arg of s.args)
    { 
      var dt=message.data[arg.name]; 
      if(arg.isSession)
      {
        dt=message.session;
      }
      if(arg.type || arg.basicType)
      {
        if(arg.isArray)
        {
          console.log(arg);
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
            var validate=  dt.$oriExtraData.isValid();  
            if(validate!==true)
            {
              return RouteResponse.failed({error:validate,name:arg.name},'parameter validation',RouteErrorMessage.validationError)
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
  static async runExternal(domain:string ,service:string ,message:MessageModel,route:string,httpMethod:string  ):Promise<RouteResponse>
  { 
    
    if(domain==null || !routes[domain])
    {
      return new RouteResponse({error: RouteErrorMessage.domainNotExist});
    }  
    if( !routes[domain]?.externalServices[service])
    {
      return new RouteResponse({error: RouteErrorMessage.serviceNotExist});
    }
    var d=routes[domain] as RouteService;
    var s= d?.externalServices[service] as ExtrnalService;

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
      
      var dt=message.data[arg.name]; 
      if(arg.isSession)
      {
        dt=message.session;
      }
      if(arg.isOdata)
      {
        dt=new OdataModel(message.data) ;
      }
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
            var validate=  dt.$oriExtraData.isValid();
            if(validate!==true)
            {
              return RouteResponse.failed({error:validate,name:arg.name},'parameter validation',RouteErrorMessage.validationError)
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