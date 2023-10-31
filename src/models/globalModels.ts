import { ObjectModel } from "../decorators/modelService";
import RouteService from "../router/routeService";
import ConfigModel from "./configModel";

export default class GlobalModels
{
    models:Map<string,ObjectModel>=new Map<string,ObjectModel>();
    routes: Map<String,RouteService> = new Map<String,RouteService>();  
	config:ConfigModel;
}