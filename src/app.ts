import { createServer, IncomingMessage, ServerResponse } from "http";
import { basicMiddleware, RouteProcessor, testController, Logger } from "./lib";
import { config } from "./config";



const routes = new RouteProcessor()
routes.get("test", testController.test)

const middleWare = new basicMiddleware()

middleWare.use(routes)

const httpServer = createServer((req: IncomingMessage, res: ServerResponse) => {
  middleWare.perform(req,res);
})

httpServer.listen(config.httpPort,() => {
  Logger.debug(`Server is listening on port ${config.httpPort}. Env is ${config.envName || "not provided use default"}`);
})
