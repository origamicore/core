
import ConfigModel from "./models/configModel";
import GlobalModels from "./models/globalModels";
import ModuleConfig from "./models/moduleConfig";
import PackageIndex from "./models/packageIndex";
import Router from "./router/router";
var globalModel:GlobalModels=global.origamicore as GlobalModels ; 
export default class OrigamiCore
{
	config:ConfigModel;
	constructor(config:ConfigModel)
	{
		this.config=config;
		globalModel.config=config;
	}
	async start()
	{ 
		for(var config of this.config.packageConfig)
		{
			var instance=await config.createInstance();
			await instance.start();
			Router.setInstance(instance);
		}  
	}
}