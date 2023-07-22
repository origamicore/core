export default class PackageConfig
{
    id:string; 
    name:string; 
    type:string; 
    
    public constructor(
        fields?: {
          id?: string,
          name?: string, 
          type?: string, 
        }) {
        if (fields) Object.assign(this, fields);
    }
}