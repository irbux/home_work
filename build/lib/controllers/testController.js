"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testController = void 0;
exports.testController = {
    test: () => {
        return (response, request) => {
            return new Promise((resolve, reject) => {
                if (!request.method && !request.headers) {
                    reject({ status: 500, message: "Not accepted request data" });
                }
                resolve({ status: 200, message: 'Success test request', body: request.body, query: request.queryStringObject });
            });
        };
    },
    notFound: () => {
        return (response, request) => {
            return new Promise((resolve, reject) => {
                if (!request.method) {
                    reject({ status: 500, message: "Not accepted request data" });
                }
                resolve({ status: 404, message: 'Page Not Found' });
            });
        };
    }
};
