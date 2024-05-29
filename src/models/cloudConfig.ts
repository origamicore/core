export enum CloudType
{
    UniqueInCloud=1,
    UniqueInServer=2,
    MultiProcess=3,
    None=4
}
export default class CloudConfig
{
    maxProcess:number=1000;
    group:string;
    type:CloudType=CloudType.MultiProcess;
    constructor(data:{
        group:string;
        type?:CloudType; 
        maxProcess?:number;
    })
    {
        Object.assign(this,data);
    }
}