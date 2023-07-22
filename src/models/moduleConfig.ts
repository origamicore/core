import PackageIndex from "./packageIndex";

export default abstract class ModuleConfig
{
    id:string='' 
    public constructor(
        fields?: {
          id?: string,  
        }) {
        if (fields) Object.assign(this, fields);
        if(!this.id)this.id=Math.random().toString();
    }
    abstract createInstance():Promise<PackageIndex> ;
}