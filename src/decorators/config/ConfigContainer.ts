import { PropTypes } from "./PropTypes";

export class OriConfigModel
{
    
    configs:Map<string,OriConfigModel>=new Map<string,OriConfigModel>();
    props:Map<string,OriConfigPropsModel>=new Map<string,OriConfigPropsModel>()
    title: string;
    description?:string;
    
    constructor(data?:{
        title: string;
        npm?:string
        description?:string;
    })
    {
        if(data)
            Object.assign(this,data)
    }
}
export class OriConfigPropsModel
{
    title?:string
    description?:string
    isRequired?:boolean 
    type?:PropTypes
    constructor(data:{
        title?:string
        description?:string
        isRequired?:boolean 
        type?:PropTypes
    })
    {
        Object.assign(this,data)
    }
}

export default class ConfigContainer
{
    static configs:Map<string,OriConfigModel>=new Map<string,OriConfigModel>();
    static temp:OriConfigModel=new OriConfigModel();
    static tempProps:Map<string,OriConfigPropsModel>=new Map<string,OriConfigPropsModel>()
    static addConfig(config:OriConfigModel,name:string,isRoot:boolean)
    {
        this.temp.props=this.tempProps;
        this.tempProps=new Map<string,OriConfigPropsModel>();
        if(isRoot)
        {
            Object.assign(this.temp,config);
            this.configs.set(name,this.temp);
            this.temp=new OriConfigModel();
        }
        else
        {
            this.temp.configs.set(name,config);
        }
    }
    static addProps(prop:OriConfigPropsModel,name:string)
    {
        this.tempProps.set(name,prop);
    }
}