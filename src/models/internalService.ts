import ArgModel from "./argModel";
import { DefaultFunction } from "./defaultFunction";

export default class InternalService
{
    parent:any;
    functionName:string;
    function:Function ;   
    args:ArgModel[]=[];
    isEvent:boolean;
    public constructor(
        fields?: { 
            functionName?: string
            function?:  Function             
            args?:ArgModel[]
            parent?:any
            isEvent?:boolean;
        }) {
        if (fields) Object.assign(this, fields);
    }
}