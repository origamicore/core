import { DefaultFunction } from "../models/defaultFunction";
import ExtrnalService from "../models/extrnalService";
import InternalService from "../models/internalService";

export default class RouteService
{
    services = new Map<String,InternalService>() ;
    externalServices=new Map<String,ExtrnalService>();
    setup(instance)
    {
        
    }
}