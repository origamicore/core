import { OriConfig, OriConfigProps } from "../../..";

@OriConfig({title:'Sample Sub Config'})
export default class SubConfig
{
    
    @OriConfigProps({
        title:'Name',
        isRequired:true 
    })
    name:string;
}