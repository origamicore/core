import ModelService from "../modelService";
import ErrorDataModel from "./errorDataModel";

export default class ExtraData{
    tags:Map<string,string[]>=new Map<string,string[]>();
    $oriErrorData:ErrorDataModel[]=[];  
    private parent:any;
    public isValid():string[]|true
    {
        return ModelService.validateObject(this.parent.constructor.name,this.parent)
    }
    setParent(parent:any)
    {
        this.parent=parent;
    }
    addTag(tag:string,name:string)
    {
        if(!this.tags[tag])this.tags[tag]=[];
        this.tags[tag].push(name);
    }
    clearByTag(tag:string)
    {
        var tags=this.tags[tag];
        if(tags)
        {
            for(var tag of tags)
            {
                if(this.parent[tag])
                {
                    this.parent[tag]=null;
                }
            }
        }
    }
    removeByTag(tag:string)
    {
        var tags=this.tags[tag];
        if(tags)
        {
            for(var tag of tags)
            {
                if(this.parent[tag])
                {
                    delete this.parent[tag];
                }
            }
        }
    }
    SetValiadte(key:string,error:string)
    {  
        var index=this.$oriErrorData.map(p=> p.key).indexOf(key);
        if(error)
        {
            if(index==-1)
            {
                this.$oriErrorData.push(new ErrorDataModel({key:key,resion:error}))
            }
            else
            {
                this.$oriErrorData[index].resion=error;
            }
        }
        else
        {
            if(index>-1)this.$oriErrorData.splice(index,1);
        } 
    }
}