import { MessageModel, Router } from "../..";

var amqp = require('amqplib/callback_api');
export default class RabbitMQReciver
{
    address:string;
    queueName:string;
    constructor(address:string,queueName:string)
    {
        this.address=address;
        this.queueName=queueName;
    }
    async connect( )
    { 
        amqp.connect(this.address, (error0, connection)=> {
            if (error0) {
                throw error0;
            }
            connection.createChannel((error1, channel)=> {
                if (error1) {
                    throw error1;
                } 

                channel.assertQueue(this.queueName, { durable: false });
                channel.prefetch(1); 
                channel.consume(this.queueName,  async(msg)=> {
                    let resp:any={};
                    let data=JSON.parse(msg.content.toString())
                    if(data.isInternal)
                    {
                        resp =await Router.runInternal(data.domain,data.service,new MessageModel(data.message))
                    }
                    else
                    {
                        resp =await Router.runExternal(data.domain,data.service,new MessageModel(data.message),data.route,data.method);
                    }
  

                    channel.sendToQueue(msg.properties.replyTo,
                        Buffer.from(JSON.stringify(resp)), {
                            correlationId: msg.properties.correlationId
                    }); 
                    channel.ack(msg);
                });
            });
        });



    }

}