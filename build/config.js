"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const arg = process.argv.slice(2);
const defaultConfiguration = { httpPort: 3000 };
const cliArguments = {};
function setConfig(args, config) {
    args.forEach((keyValue) => {
        const item = keyValue.split("=");
        if (item[0] === "APP_PORT") {
            cliArguments.httpPort = item[1];
            cliArguments.envName = item[0];
        }
    });
}
setConfig(arg, cliArguments);
exports.config = cliArguments.httpPort ? cliArguments : defaultConfiguration;
