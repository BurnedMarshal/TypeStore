"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var Collection = /** @class */ (function () {
    function Collection() {
    }
    Collection.prototype.create = function (req, res, next) {
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
    Collection.prototype.drop = function (req, res, next) {
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
    return Collection;
}());
exports.Collection = Collection;
//# sourceMappingURL=collections.js.map