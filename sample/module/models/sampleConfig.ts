import SampleIndex from "..";
import { ModuleConfig, PackageIndex } from "../../..";

export default class SampleConfig extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance = new SampleIndex();
        instance.jsonConfig(this);
        return instance;
    }

}