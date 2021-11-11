"use strict";
// import url from "url";
// import { StringDecoder } from "string_decoder";
// import { jsonToObject } from "./helpers";
// // import { routeHandlers } from "./handlers";
// import { Request } from "../types";
// // Define all the handlers
// var handlers = {
//   sample: function(data: any){
//     debugger;
//     return new Promise((resolve, reject) => {
//       if (!data) {
//         reject("Some");
//       }
//         resolve({'name':'sample handler'}); 
//     });  
//   },
//   // notFound: function(data: any,callback: (status: any, payload?: any) => void){
//   //   callback(404);
//   // }
// };
// export interface Routes {
//   [index: string]: (data: any) => Promise<any>
// }
// // Define the request router
// var router: Routes = {
//   'sample' : handlers.sample
// };
// export function basicMiddleware(req: any, res: any){
//         const parsedUrl = url.parse(req.url, true);
//         const path: any = parsedUrl.pathname;
//         const trimmedPath = path.replace(/^\/+|\/+$/g, '');
//         const queryStringObject = parsedUrl.query;
//         const method = req.method.toLowerCase();
//         const headers = req.headers;
//         const decoder = new StringDecoder('utf-8');
//         let buffer: string = '';
//         req.on('data', function(data: any) {
//             buffer += decoder.write(data);
//         });
//         req.on('end', function() {
//           buffer += decoder.end();
//           // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
//           // Construct the data object to send to the handler
//           var data: Request = {
//             'trimmedPath' : trimmedPath,
//             'queryStringObject' : queryStringObject,
//             'method' : method,
//             'headers' : headers,
//             'body' : jsonToObject(buffer)
//           };
//           // debugger;
//           var chosenHandler =  router[trimmedPath];
//           const resolved = chosenHandler(data).then((value) => {
//             var payloadString = JSON.stringify(value);
//             // Return the response
//             res.setHeader('Content-Type', 'application/json');
//             res.writeHead(500);
//             res.end(payloadString);
//             console.log("Returning this response: ",500,payloadString);
//           }).catch(error => {
//             console.log('rejected', error);
//           });    
//       });
// }
