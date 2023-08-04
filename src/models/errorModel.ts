export default class ErrorModel
{
    title:string;
    type:'minLength'|'maxLength'|'required'
    constructor(data:{
        title:string;
        type:'minLength'|'maxLength'|'required'
    })
    {
        Object.assign(this,data);
    }
}