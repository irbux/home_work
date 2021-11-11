"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteProcessor = void 0;
class RouteProcessor {
    constructor() {
        this.routes = {};
    }
    get(path, controller) {
        this.routes[`get:${path}`] = controller();
    }
}
exports.RouteProcessor = RouteProcessor;
