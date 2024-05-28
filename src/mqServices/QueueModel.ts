export default class QueueModel
{
    res:Function;
    rej:Function;
    constructor(data:{
        res:Function;
        rej:Function;
    })
    {
        Object.assign(this,data);
    }
}