import ModuleConfig from "./moduleConfig";

 

export default interface PackageIndex{ 
    name:string;
    jsonConfig(moduleConfig:ModuleConfig):Promise<void>;
    start():Promise<void>;
    restart():Promise<void>;
    stop():Promise<void>;
}