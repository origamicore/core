export default class UploadModel
{
    maxSize:number;
    public constructor(
        fields?: { 
            maxSize?: number 
        }) {
        if (fields) Object.assign(this, fields);
    }   
}