"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicMiddleware = void 0;
const url_1 = __importDefault(require("url"));
const controllers_1 = require("../controllers");
const string_decoder_1 = require("string_decoder");
const helpers_1 = require("../helpers");
const loggers_1 = require("../loggers");
class basicMiddleware {
    constructor() {
        this.processors = [];
    }
    use(processor) {
        this.processors.push(processor);
    }
    perform(request, response) {
        const parsedUrl = url_1.default.parse(request.url, true);
        const path = parsedUrl.pathname;
        const trimmedPath = path.replace(/^\/+|\/+$/g, '');
        const queryStringObject = parsedUrl.query;
        const method = request.method.toLowerCase();
        const headers = request.headers;
        const processors = this.processors;
        const decoder = new string_decoder_1.StringDecoder('utf-8');
        let buffer = '';
        request.on('data', function (data) {
            buffer += decoder.write(data);
        });
        request.on('end', function () {
            buffer += decoder.end();
            loggers_1.Logger.info("Request body read");
            const data = {
                'trimmedPath': trimmedPath,
                'queryStringObject': queryStringObject,
                'method': method,
                'headers': headers,
                'body': (0, helpers_1.jsonToObject)(buffer)
            };
            processors.forEach((processor) => {
                const endpointMethod = processor.routes[`${method}:${trimmedPath}`] || controllers_1.testController.notFound();
                endpointMethod(response, data).then((value) => {
                    const payload = JSON.stringify(value);
                    response.setHeader('Content-Type', 'application/json');
                    response.writeHead(value.status);
                    response.end(payload);
                    loggers_1.Logger.info(`Returning this response: ${value.status},${payload}`);
                }).catch(error => {
                    loggers_1.Logger.error(`Rejected: ${error}`);
                });
            });
        });
    }
}
exports.basicMiddleware = basicMiddleware;
