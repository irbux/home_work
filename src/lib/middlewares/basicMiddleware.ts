import url from "url";
import { testController } from "../controllers"
import { StringDecoder } from "string_decoder";
import { jsonToObject } from "../helpers";
import { Request } from "../../types";
import { RouteProcessor } from "../routers";
import { Logger } from "../loggers";


export class basicMiddleware {
    processors:  RouteProcessor[] 

    constructor(){
       this.processors = []
    }

    use(processor: RouteProcessor){
        this.processors.push(processor)
    }

    perform(request: any, response: any){
        const parsedUrl = url.parse(request.url, true);
        const path: any = parsedUrl.pathname;
        const trimmedPath = path.replace(/^\/+|\/+$/g, '');
      
        const queryStringObject = parsedUrl.query;
        const method = request.method.toLowerCase();
        const headers = request.headers;
        const processors = this.processors;
      

        const decoder = new StringDecoder('utf-8');
        let buffer = '';
        request.on('data', function(data: any) {
            buffer += decoder.write(data);
        });

        request.on('end', function() {
          buffer += decoder.end();

          Logger.info("Request body read");

          const data: Request = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'body' : jsonToObject(buffer)
          };


          
          processors.forEach((processor)=> {
            const endpointMethod = processor.routes[`${method}:${trimmedPath}`] || testController.notFound()

            endpointMethod(response, data).then((value) => {
                const payload = JSON.stringify(value);
                response.setHeader('Content-Type', 'application/json');
                response.writeHead(value.status);
                response.end(payload);
                Logger.info(`Returning this response: ${value.status},${payload}`)
            }).catch(error => {
                Logger.error(`Rejected: ${error}`)
            });
          })  
      });
    }
}