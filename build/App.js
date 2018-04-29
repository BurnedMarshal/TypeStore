"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyParser = __importStar(require("body-parser"));
var collections_1 = require("./routes/collections");
var routes_1 = require("./routes");
var objects_1 = require("./routes/objects");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.express = express_1.default();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        // this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        var router = express_1.default.Router();
        var collectionRoutes = new collections_1.Collection();
        var indexRoutes = new routes_1.Index();
        var objectRoutes = new objects_1.ObjectDocument();
        router.get('/', indexRoutes.index.bind(indexRoutes.index));
        router.post('/collections/:name', collectionRoutes.create.bind(collectionRoutes.create));
        router.delete('/collections/:name', collectionRoutes.drop.bind(collectionRoutes.drop));
        router.post('/:name', objectRoutes.create.bind(objectRoutes.create));
        router.get('/:name/:id', objectRoutes.read.bind(objectRoutes.read));
        // placeholder route handler
        this.express.use('/', router);
    };
    return App;
}());
exports.default = new App().express;
//# sourceMappingURL=App.js.map