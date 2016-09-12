"use strict";
var Index = (function () {
    function Index() {
    }
    Index.prototype.index = function (req, res, next) {
        res.status(200).json({ message: 'I\'m alive' });
    };
    Index.prototype.save = function (req, res, next) {
        console.log(req.params);
        res.status(200).json({ message: 'I\'m alive' });
    };
    return Index;
}());
exports.Index = Index;
//# sourceMappingURL=index.js.map