import { OriProps,IOriModel, OriModel } from "../../../"; 
@OriModel()
export default class Model2 extends IOriModel
{
    @OriProps({readOnly:'gender'})
    _id:string; 
    @OriProps({tags:'readonly',isRequired:true})
    gender:string;
    constructor(
        fields?: {
            gender?: string, 
        })
    { 
        super();  
        if (fields) 
        {
            Object.assign(this, fields); 
        }  
    }
}