import { OriModel, OriProps,IOriModel } from "../../../"; 
import Model2 from "./model2";

@OriModel()
export default class TestModel extends IOriModel
{
    @OriProps({minLength:5,isRequired:true})
    fname:string;
    lname:string;
    @OriProps()
    other:Model2;
    @OriProps()
    isAgent:boolean;
    @OriProps()
    age:number;
    constructor(
        fields?: {
            fname?: string,
            lname?: string, 
            other?: Model2,  
        })
    {
        super();  
        if (fields) 
        {
            Object.assign(this, fields);
            this.other=new Model2(fields?.other)
        }
    }
}