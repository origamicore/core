import UploadModel from "../models/uploadModel";

export default class UploadService
{
    services = new Map<String,UploadModel>() ;
    constructor(service:string,model:UploadModel)
    {   
        service[service]=model;
    }
}