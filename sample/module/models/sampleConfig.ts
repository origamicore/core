import SampleIndex from "..";
import { ModuleConfig, OriConfig, OriConfigProps, PackageIndex, PropTypes } from "../../..";
import SubConfig from "./subConfig";
@OriConfig({title:'Sample Config',isRoot:true})
export default class SampleConfig extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance = new SampleIndex();
        instance.jsonConfig(this);
        return instance;
    }
    @OriConfigProps({
        title:'Databse Context',
        isRequired:true,
        description:'This is databse Context',
        type:PropTypes.MongoContext
    })
    dbContext:string;

    @OriConfigProps({
        title:'Databse Context',
        isRequired:true,
        description:'This is databse Context' ,
        propType:SubConfig
    })
    subConfig:Map<string,SubConfig> ;
}