import QueueModel from "./QueueModel";


var amqp = require('amqplib/callback_api');
const uuid=require('uuid');
let queue:Map<string,QueueModel>=new Map<string,QueueModel>();
export default class RabbitMQSender
{
    address:string;
    queueName:string;
    channel:any;
    connectedQueue:string=''
    constructor(address:string,queueName:string)
    {
        this.address=address;
        this.queueName=queueName;
    }

    async run(obj:any)
    {  
        return await new Promise((res,rej)=>{
            
            var correlationId = uuid.v4(); 
            queue.set(correlationId,new QueueModel({res,rej}))
            this.channel.sendToQueue(this.queueName,
                Buffer.from(JSON.stringify(obj)),{
                correlationId: correlationId,
                replyTo: this.connectedQueue });
        })
    }
    async connect()
    { 
        return await new Promise((res,rej)=>{
            amqp.connect(this.address, (error0, connection)=> {
                if (error0) {
                    throw error0;
                }
                connection.createChannel( (error1, channel)=> {
                    if (error1) {
                        throw error1;
                    }
                    channel.assertQueue('', {
                        exclusive: true
                    },  (error2, q)=> {
                        if (error2) {
                            throw error2;
                        }

                        this.channel=channel;

                        this.channel.consume(q.queue, (msg)=> {
                            let q=queue.get(msg.properties.correlationId)
                            if (q) {

                                q.res(JSON.parse(msg.content.toString())) 
                            }
                        }, {
                            noAck: true
                        });
     
                        this.connectedQueue=q.queue
                        res({});
                    });
                });
            });
        })





    }
}