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
Object.defineProperty(exports, "__esModule", { value: true });
var basic_1 = require("./basic");
var IndexRouter = /** @class */ (function (_super) {
    __extends(IndexRouter, _super);
    function IndexRouter() {
        var _this = _super.call(this) || this;
        _this.routeBinding();
        return _this;
    }
    IndexRouter.prototype.routeBinding = function () {
        this.router.get('/', this.index);
    };
    IndexRouter.prototype.index = function (req, res, next) {
        res.status(200).json({ message: 'I\'m alive' });
    };
    return IndexRouter;
}(basic_1.BasicRouter));
exports.IndexRouter = IndexRouter;
//# sourceMappingURL=index.js.map