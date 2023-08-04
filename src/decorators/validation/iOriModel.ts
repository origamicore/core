import ErrorModel from "../../models/errorModel";
import ModelService from "../modelService"; 

export default class IOriModel
{   
    public isValid():string|true
    {
        return ModelService.validateObject(this.constructor.name,this)
    }
    
    clearByTag(tag:string)
    {
        let tags=ModelService.getByTag(this.constructor.name,tag) 
        if(tags)
        {
            for(var tag of tags)
            {
                if(this[tag])
                {
                    this[tag]=null;
                }
            }
        }
    }
    removeByTag(tag:string)
    {
        let tags=ModelService.getByTag(this.constructor.name,tag) 
        if(tags)
        {
            for(var tag of tags)
            {
                if(this[tag])
                {
                    delete this[tag];
                }
            }
        }
    }
    toJSON()
    { 
        var copy:any={};
        for(let prop in this)
        { 
            if(prop[0]=='@')continue;
            copy[prop]=this[prop]
        }         
        var model=ModelService.getModel(this.constructor.name)
        for(let prop of model.props)
        {
            if(!prop.ignoreToJson)
            {
                copy[prop.name]=this['@'+prop.name];
            }
        } 
        return  copy;
    }
}