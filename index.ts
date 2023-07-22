 
import GlobalModels from './src/models/globalModels';
var globalModel:GlobalModels=new GlobalModels();
if(global.origamicore)
{
  globalModel=global.origamicore as GlobalModels ;
}  

import ModuleConfig from './src/models/moduleConfig';
import PackageIndex from './src/models/packageIndex'; 
import OrigamiCore from './src/origamiCore';
import Router from './src/router/router';
import OriInjectable, { DataInput, OdataInput, OriModel, OriProps, OriService, SessionInput } from "./src/decorators/decorator";
import IOriModel from './src/decorators/validation/iOriModel';
import MessageModel from './src/models/messageModel';
import ConfigModel from './src/models/configModel';
import RouteResponse, { AddedResponse, ResponseDataModel, ResponseErrorModel } from './src/models/routeResponse';
import OdataModel from './src/router/odataModel';
import ExtrnalService, { HttpMethod } from './src/models/extrnalService';
export default OrigamiCore
export {
	ModuleConfig,
	ConfigModel,
	PackageIndex,
	Router,
	OriInjectable,
	DataInput, 
	OriService, 
	SessionInput,
	OriProps,
	IOriModel,
	MessageModel,
	OriModel,
	RouteResponse,
	ResponseDataModel,
	ResponseErrorModel,
	AddedResponse,
	OdataModel,
	OdataInput,
	ExtrnalService,
	HttpMethod
}