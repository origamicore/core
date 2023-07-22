import ArgModel from "./argModel";
import { DefaultFunction } from "./defaultFunction";

export default class InternalService
{
    parent:any;
    functionName:string;
    function:Function ;   
    args:ArgModel[]=[];
    public constructor(
        fields?: { 
            functionName?: string
            function?:  Function             
            args?:ArgModel[]
            parent?:any
        }) {
        if (fields) Object.assign(this, fields);
    }
}