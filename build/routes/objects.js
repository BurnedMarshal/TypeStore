"use strict";
var fs = require('fs');
var bson = require('bson');
var BSON = new bson.BSONPure.BSON();
var Object = (function () {
    function Object() {
    }
    Object.prototype.create = function (req, res, next) {
        var object = req.body;
        console.log(object);
        var newBson = {};
        for (var prop in object) {
            if (typeof object[prop] === 'boolean' || typeof object[prop] === 'string') {
                newBson[prop] = object[prop];
            }
            else if (typeof object[prop] === 'number') {
                newBson[prop] = bson.BSONPure.Long.fromNumber(object[prop]);
            }
        }
        object.$id = bson.BSONPure.ObjectID.createFromTime(Date.now());
        newBson.$id = object.$id;
        var bsonBuffer = BSON.serialize(newBson, false, true, false);
        var indexFilePath = __dirname + '/../../data/' + req.params.name + '/' + req.params.name + '.json';
        var collectionFilePath = __dirname + '/../../data/' + req.params.name + '/' + req.params.name + '.bson';
        if (!fs.existsSync(indexFilePath)) {
            var index = {};
            index[object.$id] = { size: bsonBuffer.byteLength, start: 0, end: bsonBuffer.byteLength };
            var json = JSON.stringify(index);
            fs.writeFile(indexFilePath, json);
            fs.open(collectionFilePath, 'wx', function (err, fd) {
                fs.write(fd, bsonBuffer, 0, bsonBuffer.byteLength, function (err) {
                    if (err) {
                        return res.status(500).json({ message: 'ERROR 0004: Error saving object' });
                    }
                    return res.status(201).json({ message: 'Object created' });
                });
            });
        }
        else {
            // TODO: Append data to file.
            var jsonData = void 0;
            var index_1;
            fs.readFile(indexFilePath, function (err, data) {
                console.log("json data: ", data.toString());
                index_1 = JSON.parse(data.toString());
                index_1[object.$id] = { size: bsonBuffer.byteLength, start: index_1['0'].size, end: bsonBuffer.byteLength + index_1['0'].size };
                index_1['0'] = { size: bsonBuffer.byteLength + index_1['0'].size };
                fs.writeFile(indexFilePath, JSON.stringify(index_1));
                fs.open(collectionFilePath, 'a+', function (err, fd) {
                    fs.write(fd, bsonBuffer, 0, bsonBuffer.byteLength, index_1['0'].size - bsonBuffer.byteLength, function (err) {
                        if (err) {
                            return res.status(500).json({ message: 'ERROR 0004: Error saving object' });
                        }
                        return res.status(201).json({ message: 'Object created' });
                    });
                });
            });
        }
    };
    return Object;
}());
exports.Object = Object;
//# sourceMappingURL=objects.js.map