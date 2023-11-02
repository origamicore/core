export default class SelectModel
{
    name:string;
    title:string;
    func:'sum'|'count';
    constructor(
        fields?: {
            name?:string;
            title?:string;
            func?:'sum'|'count';
    }){
        if(fields)
            Object.assign(this,fields);
    }
}