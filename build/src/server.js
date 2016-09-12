"use strict";
var logger_1 = require('./logger');
var bodyParser = require('body-parser');
var express = require('express');
var indexRoute = require('./routes/index');
var Server = (function () {
    function Server() {
        var _this = this;
        this.PORT = 40010;
        this.app = express();
        this.app.use(bodyParser.json());
        this.routes();
        this.app.listen(this.PORT, function () {
            logger_1.default.info('TypeData running on port ', _this.PORT);
        });
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.routes = function () {
        // get router
        var router;
        router = express.Router();
        // create routes
        var index = new indexRoute.Index();
        router.get('/', index.index.bind(index.index));
        router.post('/', index.save.bind(index.save));
        this.app.use(router);
    };
    return Server;
}());
var typeStore = Server.bootstrap();
module.exports = typeStore;
//# sourceMappingURL=server.js.map