"use strict";
var logger_1 = require('./logger');
var bodyParser = require('body-parser');
var express = require('express');
var indexRoute = require('./routes/index');
var collectionsRoute = require('./routes/collections');
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
        var collections = new collectionsRoute.Collection();
        var objects = new collectionsRoute.Collection();
        router.get('/', index.index.bind(index.index));
        // router.post('/', index.save.bind(index.save));
        // Collections
        router.post('/collections/:name', collections.create.bind(collections.create));
        router.delete('/collections/:name', collections.drop.bind(collections.drop));
        // Objects
        router.post('/collections/:name/', objects.create.bind(objects.create));
        this.app.use(router);
    };
    return Server;
}());
var typeStore = Server.bootstrap();
module.exports = typeStore;
//# sourceMappingURL=server.js.map