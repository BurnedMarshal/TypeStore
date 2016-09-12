import * as winston from 'winston';

let logger = new (winston.Logger)({
    exceptionHandlers: [ new (winston.transports.Console)({ json: false, timestamp: true })],
    exitOnError: false,
    transports: [ new (winston.transports.Console)({ json: false, timestamp: true })],
});

// Saving log into file over configuration add this lines on code:
// Trasports
// new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
// exceptionHandlers
// new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })

export default logger;
