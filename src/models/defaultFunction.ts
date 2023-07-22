import MessageModel from "./messageModel";
import RouteResponse from "./routeResponse";

export type DefaultFunction=(message:MessageModel)=>Promise<RouteResponse> ;