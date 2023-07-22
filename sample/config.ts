import {ConfigModel,ModuleConfig} from "../"; 
import SampleConfig from "./module/models/sampleConfig";

export default new ConfigModel({
    packageConfig:[
        new SampleConfig({
            id:'1', 
        })
    ]
});