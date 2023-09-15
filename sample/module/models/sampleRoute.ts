import {MessageModel,RouteResponse,Router} from "../../../"; 

export default class SampleRoute
{
    static domain='test';
    static async RunTestService(firstName:string,lastName:string,addedData:any)
    {
       return await Router.runInternal(this.domain,'internalService',new MessageModel({data:{
           info:{fname:firstName,lname:lastName,other:{sex:'test'}},
           addedData
        }}))
    }
    static async RunTestService1(firstName:string,lastName:string,addedData:any)
    {
       return await Router.runInternal(this.domain,'internalService1',new MessageModel({data:{
           info:{fname:firstName,lname:lastName,other:{sex:'test'}},
           addedData
        }}))
    }
    static async RunGetTest()
    {
       return await Router.runExternal(this.domain,'getSample',new MessageModel( ),'/test/getSample','GET')
    }
    static async RunEventService(event:(data:RouteResponse)=>void)
    {
       return await Router.runExternal(this.domain,'eventService',new MessageModel({}),'/test/eventService','GET',event,23333)
    }
}