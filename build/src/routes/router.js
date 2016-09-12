"use strict";
var Index = (function () {
    function Index() {
    }
    Index.prototype.index = function (req, res, next) {
        res.status(200).json({ message: 'I\'m alive' });
    };
    return Index;
}());
exports.Index = Index;
//# sourceMappingURL=router.js.map