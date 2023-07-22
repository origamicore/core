export default class MessageModel
{
    data:any;
    // internalData:any;
    session:any;
    
    public constructor(
        fields?: { 
          data?: any
          // internalData?: any
          session?: any
        }) {
        if (fields) Object.assign(this, fields);
    }
}