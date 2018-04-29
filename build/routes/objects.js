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
var bson = __importStar(require("bson"));
var BSON = new bson.BSON();
var ObjectDocument = /** @class */ (function () {
    function ObjectDocument() {
    }
    ObjectDocument.prototype.create = function (req, res, next) {
        var object = req.body;
        var newBson = {};
        for (var prop in object) {
            if (typeof object[prop] === 'boolean' || typeof object[prop] === 'string') {
                newBson[prop] = object[prop];
            }
            else if (typeof object[prop] === 'number') {
                newBson[prop] = bson.Long.fromNumber(object[prop]);
            }
        }
        object.$id = bson.ObjectID.createFromTime(Date.now());
        newBson.$id = object.$id;
        var bsonBuffer = BSON.serialize(newBson, false, true, false);
        var indexFilePath = __dirname + '/../../data/' + req.params.name + '/' + req.params.name + '.json';
        var collectionFilePath = __dirname + '/../../data/' + req.params.name + '/' + req.params.name + '.bson';
        if (!fs.existsSync(indexFilePath)) {
            var index = {};
            index[object.$id] = { size: bsonBuffer.byteLength, start: 0, end: bsonBuffer.byteLength };
            index['0'] = index[object.$id];
            fs.writeFileSync(indexFilePath, JSON.stringify(index));
            fs.open(collectionFilePath, 'wx', function (err, fd) {
                fs.write(fd, bsonBuffer, 0, bsonBuffer.byteLength, function (error) {
                    if (err) {
                        return res.status(500).json({ message: 'ERROR 0004: Error saving object' });
                    }
                    return res.status(201).json(object);
                });
            });
        }
        else {
            var index_1;
            fs.readFile(indexFilePath, function (err, data) {
                index_1 = JSON.parse(data.toString());
                index_1[object.$id] = {
                    size: bsonBuffer.byteLength,
                    start: index_1['0'].size,
                    end: bsonBuffer.byteLength + index_1['0'].size,
                };
                index_1['0'].size = bsonBuffer.byteLength + index_1['0'].size;
                fs.writeFileSync(indexFilePath, JSON.stringify(index_1));
                fs.open(collectionFilePath, 'a+', function (error, fd) {
                    fs.write(fd, bsonBuffer, 0, bsonBuffer.byteLength, index_1['0'].size - bsonBuffer.byteLength, function (writeError) {
                        if (err) {
                            return res.status(500).json({ message: 'ERROR 0004: Error saving object' });
                        }
                        return res.status(201).json(object);
                    });
                });
            });
        }
    };
    ObjectDocument.prototype.read = function (req, res, next) {
        var id = req.params.id;
        var indexFilePath = __dirname + '/../../data/' + req.params.name + '/' + req.params.name + '.json';
        var collectionFilePath = __dirname + '/../../data/' + req.params.name + '/' + req.params.name + '.bson';
        if (fs.existsSync(indexFilePath)) {
            fs.readFile(indexFilePath, function (err, data) {
                var index = JSON.parse(data.toString());
                if (index[id]) {
                    fs.open(collectionFilePath, 'r', function (error, fd) {
                        var buffer = new Buffer(index[id].size);
                        fs.read(fd, buffer, 0, index[id].size, index[id].start, function (err, bytes, bsonBuffer) {
                            var object = BSON.deserialize(buffer);
                            return res.status(200).json(object);
                        });
                    });
                }
                else {
                    return res.status(404).json('ERROR 0005: document missing');
                }
            });
        }
        else {
            return res.status(404).json('ERROR 0005: index missing');
        }
    };
    return ObjectDocument;
}());
exports.ObjectDocument = ObjectDocument;
//# sourceMappingURL=objects.js.map