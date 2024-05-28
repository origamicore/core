export enum CloudType
{
    UniqueInCloud=1,
    UniqueInServer=2,
    MultiProcess=3,
    None=4
}
export default class CloudConfig
{
    group:string;
    type:CloudType=CloudType.MultiProcess;
    constructor(data:{
        group:string;
        type?:CloudType; 
    })
    {
        Object.assign(this,data);
    }
}