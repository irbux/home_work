"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToObject = void 0;
function jsonToObject(data) {
    try {
        const obj = JSON.parse(data);
        return obj;
    }
    catch (e) {
        return {};
    }
}
exports.jsonToObject = jsonToObject;
