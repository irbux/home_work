"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const lib_1 = require("./lib");
const config_1 = require("./config");
const routes = new lib_1.RouteProcessor();
routes.get("test", lib_1.testController.test);
const middleWare = new lib_1.basicMiddleware();
middleWare.use(routes);
const httpServer = (0, http_1.createServer)((req, res) => {
    middleWare.perform(req, res);
});
httpServer.listen(config_1.config.httpPort, () => {
    lib_1.Logger.debug(`Server is listening on port ${config_1.config.httpPort}. Env is ${config_1.config.envName || "not provided use default"}`);
});
