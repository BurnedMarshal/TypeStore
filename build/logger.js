"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston = __importStar(require("winston"));
var logger = new (winston.Logger)({
    exceptionHandlers: [new (winston.transports.Console)({ json: false, timestamp: true })],
    exitOnError: false,
    transports: [new (winston.transports.Console)({ json: false, timestamp: true })],
});
// Saving log into file over configuration add this lines on code:
// Trasports
// new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
// exceptionHandlers
// new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })
exports.default = logger;
//# sourceMappingURL=logger.js.map