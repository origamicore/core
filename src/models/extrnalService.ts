import ArgModel from "./argModel"; 
import { DefaultFunction } from "./defaultFunction";
import GlobalModels from "./globalModels";
var globalModel:GlobalModels=global.origamicore as GlobalModels; 
export enum HttpMethod
{
    Get="GET",
    Post="POST",
    Put="PUT",
    Delete="DELETE",
    None="None",
} 

export default class ExtrnalService
{
    routeMap:{isParam:boolean,name:string}[]=[]
    parent:any;
    functionName:string;
    function:Function ; 
    isPublic:boolean=true; 
    roles:number[]=[]; 
    args:ArgModel[]=[];
    maxUploadSize:number=0;
    method:HttpMethod;
    public constructor(
        fields?: { 
            functionName?: string
            function?: DefaultFunction
            isPublic?: boolean
            roles?: number[]  
            args?: ArgModel[]  
            maxUploadSize?:number
            parent?:any;
            method:HttpMethod; 
            route?:string;
        }) {
        if (fields) Object.assign(this, fields);
        // fields.method??=globalModel.config.defaultMethod;
        if(fields?.route)
        {
            var split=fields.route.split('/')
            for(var r of split)
            {
                if(r[0]==':')
                {
                    this.routeMap.push({isParam:true,name:r.substring(1,r.length)});
                }
                else
                {
                    this.routeMap.push({isParam:false,name:r});
                }
            }
        }
    }
    validateRoute(route:string):any|false
    {
        var split=route.split('/');
        if(split.length!=this.routeMap.length+3) return false;
        var obj={};
        for(var i=3;i<split.length;i++)
        {
            var routeData=this.routeMap[i-3];
            if(routeData.isParam)
            {
                obj[routeData.name]=split[i]
            }
            else
            {
                if(routeData.name!=split[i])return false;
            }
        }
        return obj;
    }
}