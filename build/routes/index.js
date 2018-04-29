"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Index = /** @class */ (function () {
    function Index() {
    }
    Index.prototype.index = function (req, res, next) {
        res.status(200).json({ message: 'I\'m alive' });
    };
    return Index;
}());
exports.Index = Index;
//# sourceMappingURL=index.js.map