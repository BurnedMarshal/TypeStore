"use strict";
var Object = (function () {
    function Object() {
    }
    Object.prototype.create = function (req, res, next) {
        var collectionPath = __dirname + '/../../data/' + req.params.name;
    };
    return Object;
}());
exports.Object = Object;
//# sourceMappingURL=objects.js.map