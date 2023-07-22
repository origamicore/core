import { ResponseErrorModel } from "../models/routeResponse";

export default class RouteErrorMessage
{
    
  static domainNotExist:ResponseErrorModel  = new ResponseErrorModel({code:'route001' ,message: 'Domain Not Exist'} );
  static serviceNotExist:ResponseErrorModel  =new ResponseErrorModel({code:'route003' ,message: 'Service Not Exist',} );
  static timeout:ResponseErrorModel  =new ResponseErrorModel({code:'route002' ,message: 'Timeout'} );
  static access:ResponseErrorModel  =new ResponseErrorModel({code:'route003' ,message: 'Access Denied'} );

  static validationError:string='route004'
}