import RouteService from "../router/routeService";
import ConfigModel from "./configModel";

export default class GlobalModels
{
    routes: Map<String,RouteService> = new Map<String,RouteService>();  
	config:ConfigModel;
}