"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var basic_1 = require("./basic");
var CollectionRouter = /** @class */ (function (_super) {
    __extends(CollectionRouter, _super);
    function CollectionRouter() {
        var _this = _super.call(this) || this;
        _this.routeBinding();
        return _this;
    }
    CollectionRouter.prototype.routeBinding = function () {
        this.router.post('/:name', this.create);
        this.router.delete('/:name', this.drop);
    };
    CollectionRouter.prototype.create = function (req, res, next) {
        var collectionPath = __dirname + '/../../data/' + req.params.name;
        if (!fs.existsSync(collectionPath)) {
            fs.mkdir(collectionPath, function (err) {
                if (err) {
                    return res.status(500).json({ message: 'ERROR 0001: failed create collection' });
                }
                return res.status(201).json({ message: "Collection " + req.params.name + " created" });
            });
        }
        else {
            return res.status(500).json({ message: 'ERROR 0002: collection alredy exist' });
        }
    };
    CollectionRouter.prototype.drop = function (req, res, next) {
        var collectionPath = __dirname + '/../../data/' + req.params.name;
        if (!fs.existsSync(collectionPath)) {
            return res.status(500).json({ message: "ERROR 0003: collection missing" });
        }
        fs.readdirSync(collectionPath).forEach(function (file, index) {
            var curPath = collectionPath + '/' + file;
            fs.unlinkSync(curPath);
        });
        fs.rmdirSync(collectionPath);
        res.status(200).json({ message: "Collection " + req.params.name + " deleted" });
    };
    return CollectionRouter;
}(basic_1.BasicRouter));
exports.CollectionRouter = CollectionRouter;
//# sourceMappingURL=collections.js.map