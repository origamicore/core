 
import {OriInjectable,PackageIndex,DataInput, OriService, SessionInput,ModuleConfig} from "../../"; 
import TestModel from "./models/testModel"; 

@OriInjectable({domain:'test'})
class SampleIndex implements PackageIndex
{ 
    name:string='test';
    jsonConfig(moduleConfig: ModuleConfig): Promise<void> { 
        return ;
    }
    start(): Promise<void> {
        SampleIndex.prototype['internalService1']= SampleIndex1.prototype.internalService1;
        return;
    }
    restart(): Promise<void> {
        return;
    }
    stop(): Promise<void> {
        return;
    }

    @OriService({isInternal:true,})
    async internalService( info:TestModel,@DataInput({basicType:String,isArray:true}) addedData?:string[])
    {
        console.log('name>',this.name );
        console.log('info>',info); 
        console.log('info>',JSON.stringify(info) ); 
        console.log('errors>',info.$oriExtraData.isValid());
        console.log('addedData>',addedData);

    }
    @OriService()
    async testService(@DataInput({classType:TestModel}) info,@SessionInput session)
    {
        console.log('info>',info);
        console.log('session>',session);
        
    }
 
}
@OriInjectable({domain:'test'})
class SampleIndex1 
{ 
    name:string='test'; 
    async start(): Promise<void> {
    } 

    @OriService({isInternal:true,})
    async internalService1(@DataInput({classType:TestModel}) info:TestModel,addedData)
    {
        console.log('internalService1 >',this.name );

    }
}
export {SampleIndex1}
export default SampleIndex

