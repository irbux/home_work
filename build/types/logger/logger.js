"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor(log) {
        this.item = log;
    }
    // STDOUT
    static run({ logItem = "" } = {}) {
        console.log(new Logger(logItem));
    }
}
exports.Logger = Logger;
