import CloudConfig from "./cloudConfig";
import PackageIndex from "./packageIndex";

export default abstract class ModuleConfig
{
    id:string='' 
    inMainThread:boolean;
    cloud:CloudConfig;
    public constructor(
        fields?: {
          id?: string,  
          inMainThread?:boolean
          cloud?:CloudConfig
        }) {
        if (fields) Object.assign(this, fields);
        if(!this.id)this.id=Math.random().toString();
    }
    abstract createInstance():Promise<PackageIndex> ;
}