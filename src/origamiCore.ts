
import { CloudType } from "./models/cloudConfig";
import ConfigModel from "./models/configModel";
import GlobalModels from "./models/globalModels";
import ModuleConfig from "./models/moduleConfig";
import PackageIndex from "./models/packageIndex";
import Router from "./router/router";
var globalModel:GlobalModels=global.origamicore as GlobalModels ; 
export default class OrigamiCore
{
	config:ConfigModel;
	instances:PackageIndex[]=[]
	constructor(config:ConfigModel)
	{
		this.config=config;
		globalModel.config=config;
	}
	async start(indexes:number[]=[],mqAddress:string='')
	{ 
		if(mqAddress)
		{
			for(let i=0;i<this.config.packageConfig.length;i++)
			{
				let config=this.config.packageConfig[i];
				if(config.cloud)
				{
					if(indexes.indexOf(i)>-1)
					{
						var instance=await config.createInstance();
						await instance.start();
						Router.setMQReciver(mqAddress,instance);
						Router.setInstance(instance);
						this.instances.push(instance); 
					}
					else
					{
						
						if(config.cloud.type==CloudType.None)
						{
							continue
						}
						var instance=await config.createInstance();
						Router.setMQSender(mqAddress,instance);					
					}
				}
				else
				{
					var instance=await config.createInstance();
					await instance.start();
					Router.setInstance(instance);
					this.instances.push(instance);
				}
			}
		}
		else
		{
			for(var config of this.config.packageConfig)
			{
				var instance=await config.createInstance();
				await instance.start();
				Router.setInstance(instance);
				this.instances.push(instance);
			}  
		}
	}
	async stop(index:number=-1)
	{ 
		if(index>-1)
		{
			this.instances[index].stop();
		}
		else
		{
			for(var instance of this.instances)
			{ 
				instance.stop();
			}
		}
	}
	async restart(index:number=-1)
	{ 
		if(index>-1)
		{
			this.instances[index].restart();
		}
		else
		{
			for(var instance of this.instances)
			{ 
				instance.restart();
			}
		}
	}
}