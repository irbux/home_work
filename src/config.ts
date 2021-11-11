import { Config } from "./types/config";

const arg = process.argv.slice(2)

const  defaultConfiguration: Config  = { httpPort: 3000 };
const cliArguments: Config = {}; 

function setConfig(args: any, config: Config): void {
    args.forEach((keyValue: string) => {
        const item = keyValue.split("=") 
        if(item[0] === "APP_PORT") {
            cliArguments.httpPort = item[1]
            cliArguments.envName = item[0]
        }
    })
}

setConfig(arg, cliArguments);

export const config  = cliArguments.httpPort ? cliArguments  : defaultConfiguration



