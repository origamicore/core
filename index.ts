 
import GlobalModels from './src/models/globalModels'; 
var globalModel:GlobalModels=new GlobalModels();
if(global.origamicore)
{
  globalModel=global.origamicore as GlobalModels ;
}  
else
{
  global.origamicore=globalModel
}

import ModuleConfig from './src/models/moduleConfig';
import PackageIndex from './src/models/packageIndex'; 
import OrigamiCore from './src/origamiCore';
import Router from './src/router/router';
import OriInjectable, { DataInput, EventInput, EventKeyInput, OdataInput, OriGetService, OriModel, OriPostService, OriProps, OriService, SessionInput } from "./src/decorators/decorator";
import IOriModel from './src/decorators/validation/iOriModel';
import MessageModel from './src/models/messageModel';
import ConfigModel from './src/models/configModel';
import RouteResponse, { AddedResponse, ResponseDataModel, ResponseErrorModel } from './src/models/routeResponse';
import OdataModel from './src/router/odataModel';
import ExtrnalService, { HttpMethod } from './src/models/extrnalService';
import OriConfig, { OriConfigProps } from './src/decorators/config/ConfigDecorator';
import { PropTypes } from './src/decorators/config/PropTypes';
import ModelService,{  ObjectModel } from './src/decorators/modelService';
import OdataResponse from './src/models/common/odataResponse';
import SelectModel from './src/models/database/selectModel';
import SortModel from './src/models/database/sortModel';
import CloudConfig, { CloudType } from './src/models/cloudConfig';
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
	HttpMethod,
	EventInput,
	OriGetService,
	OriPostService,
	OriConfigProps,
	OriConfig,
	EventKeyInput,
	PropTypes,
	ObjectModel,
	ModelService,
	OdataResponse,
	SelectModel,
	SortModel,
	CloudConfig,
	CloudType
	
}