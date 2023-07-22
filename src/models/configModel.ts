import { HttpMethod } from "./extrnalService";
import ModuleConfig from "./moduleConfig";

export default class ConfigModel
{
    public defaultMethod:HttpMethod=HttpMethod.None;
    public packageConfig:ModuleConfig[]=[];
    public constructor(
        fields?: {
            defaultMethod?:HttpMethod
            packageConfig?: ModuleConfig[], 
        }) {
        if (fields) Object.assign(this, fields);
    }

}