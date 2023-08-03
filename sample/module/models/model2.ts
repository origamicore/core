import { OriProps,IOriModel, OriModel } from "../../../"; 
@OriModel()
export default class Model2 extends IOriModel
{ 
    _id:string; 
    @OriProps({ isRequired:true,})
    gender:string;
    
    @OriProps({isRequired:true})
    firstName:string;
    @OriProps({isRequired:true})
    lastName:string;
    @OriProps({tags:'removable',title:'Full Name',readOnly: (p:Model2 )=>{ return p.firstName+'_'+p.lastName}})
    fullName:string;
    constructor(
        fields?: {
            _id:string; 
            gender?: string, 
            firstName:string;
            lastName:string;
        })
    { 
        super();  
        if (fields) 
        {
            Object.assign(this, fields); 
        }  
    }
}