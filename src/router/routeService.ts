 
import { DefaultFunction } from "../models/defaultFunction";
import ExtrnalService from "../models/extrnalService";
import InternalService from "../models/internalService";
import RabbitMQReciver from "../mqServices/rabbitMQReciver";
import RabbitMQSender from "../mqServices/rabbitMQSender";
import {MessageModel, PackageIndex , RouteResponse } from "../..";

export enum RouteType
{
    None=0,
    MQReciver=1,
    MQSender=2
}
export default class RouteService
{
    services = new Map<String,InternalService>() ;
    externalServices=new Map<String,ExtrnalService|ExtrnalService[]>();
    type:RouteType=RouteType.None;
    sender:RabbitMQSender;
    async setupMQReciver(mqAddress:string,instance:PackageIndex)
    {
        this.type=RouteType.MQReciver;
        let mq= new RabbitMQReciver(mqAddress,instance.name);
        await mq.connect()
    }
    async setupMQSender(mqAddress:string,instance:PackageIndex)
    {
        this.type=RouteType.MQSender;
        this.sender= new RabbitMQSender(mqAddress,instance.name);
        await this.sender.connect() 
    }
    async sendMessage(isInternal:boolean,domain:string,service:string,message:MessageModel,route?:string,method?: string)
    {
        let obj:any={
            isInternal,domain,service,message,route,method,
        }
        return new RouteResponse(await this.sender.run(obj)) 
    }
}