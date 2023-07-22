import ModelService from "../modelService";
import ErrorDataModel from "./errorDataModel";
import ExtraData from "./extraData";

export default class IOriModel
{
    $oriExtraData:ExtraData;
    $oriValues:any={}; 
    $oriJSonProps:any={};
    constructor()
    {  
        if(!this.$oriExtraData)this.$oriExtraData=new ExtraData();
        if(this.$oriExtraData)this.$oriExtraData.setParent(this);          
    }
    toJSON()
    {
        var ignore=['$oriJSonProps','$oriValues','$oriExtraData']
        var copy:any={};
        for(let prop in this)
        {
            if(ignore.indexOf(prop)!=-1)continue;
            copy[prop]=this[prop]
        }         
        var model=ModelService.getModel(this.constructor.name)
        for(let prop of model.props)
        {
            if(!prop.ignoreToJson)
            {
                copy[prop.name]=this[prop.name];
            }
        } 
        return  copy;
    }
}