import { Route, Routers } from "../types";


export class RouteProcessor implements Routers {
    routes: Route

    constructor(){
       this.routes = {};
    }
     
    get(path: string,  controller: () => { (response: any, request: any): Promise<any> } ) {
        this.routes[`get:${path}`] = controller()
    }
}