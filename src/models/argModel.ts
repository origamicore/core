export default class ArgModel
{
    name:string;
    type:any;
    basicType:any;
    isSession:boolean=false;
    isOdata:boolean=false;
    isArray:boolean=false;
    public constructor(
        fields?: { 
            name?: string 
            type?: any 
            basicType?:any
            isArray?:boolean
        }) {
        if (fields) Object.assign(this, fields);
    }
}