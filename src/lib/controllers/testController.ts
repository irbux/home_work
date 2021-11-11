import { Request } from "../../types";
import { Logger } from "../loggers";



export const testController = {
    test: () => { 
        return (response: any, request: Request) => {
            return new Promise((resolve, reject) => {
                if (!request.method && !request.headers) {
                    reject({status: 500, message:"Not accepted request data"});
                }
                resolve({status: 200, message: 'Success test request', body: request.body, query: request.queryStringObject}); 
            }); 
        }
    },

    notFound: () => {
       return  (response: any, request: Request) => {
            return new Promise((resolve, reject) => {
                if (!request.method) {
                reject({status: 500, message: "Not accepted request data"});
                }
                resolve({status: 404, message: 'Page Not Found'}); 
            }); 
        } 
    }
}
 