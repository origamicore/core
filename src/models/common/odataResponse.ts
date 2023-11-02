export default class OdataResponse<T>
{
    value:T[]=[];
    count:number;
    constructor(
        cls: { new(data:any): T },
        fields?: {
            value?:T[];
            count?:number;
    }){
        this.count=fields.count;
        for(var data of fields?.value)
        {
            this.value.push(new cls(data) )
        }
    }
    toJson()
    {
        return JSON.parse(JSON.stringify(this))
    }
}