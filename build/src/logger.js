"use strict";
var winston = require('winston');
var logger = new (winston.Logger)({
    exceptionHandlers: [new (winston.transports.Console)({ json: false, timestamp: true })],
    exitOnError: false,
    transports: [new (winston.transports.Console)({ json: false, timestamp: true })],
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logger;
//# sourceMappingURL=logger.js.map