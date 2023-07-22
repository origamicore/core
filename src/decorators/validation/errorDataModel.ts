export default class ErrorDataModel
{
    public constructor(
        fields?: {
            key?: string,
            resion?: string,  
        }) {
        if (fields) Object.assign(this, fields);
    }
    key:string;
    resion:string;
}