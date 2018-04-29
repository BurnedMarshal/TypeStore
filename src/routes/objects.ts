import * as express from 'express';
import * as fs from 'fs';
import * as bson from 'bson';


let BSON = new bson.BSON();

export interface IndexRecord {
    size: number;
    start: number;
    end: number;
}

export interface Index {
    [keyName: string]: IndexRecord
}

export class ObjectDocument {

    public create(req: express.Request, res: express.Response, next: express.NextFunction) {
        let object = req.body;
        let newBson: any = {};
        for (let prop in object) {
            if (typeof object[prop] === 'boolean' || typeof object[prop] === 'string') {
                newBson[prop] = object[prop];
            } else if (typeof object[prop] === 'number') {
                newBson[prop] = bson.Long.fromNumber(object[prop]);
            }
        }
        object.$id = bson.ObjectID.createFromTime(Date.now());
        newBson.$id = object.$id;
        let bsonBuffer = BSON.serialize(newBson, false, true, false);
        let indexFilePath = __dirname + '/../../data/' + req.params.name + '/' + req.params.name + '.json';
        let collectionFilePath = __dirname + '/../../data/' + req.params.name + '/' + req.params.name + '.bson';
        if (!fs.existsSync(indexFilePath)) {
            let index: Index = {};
            index[object.$id] = {size: bsonBuffer.byteLength, start: 0, end: bsonBuffer.byteLength};
            index['0'] = index[object.$id];
            fs.writeFileSync(indexFilePath, JSON.stringify(index));
            fs.open(collectionFilePath, 'wx', (err, fd) => {
                fs.write(fd, bsonBuffer, 0, bsonBuffer.byteLength, function(error: NodeJS.ErrnoException) {
                    if (err) {
                        return res.status(500).json({message: 'ERROR 0004: Error saving object'});
                    }
                    return res.status(201).json(object);
                });
            });
        } else {
            let index: Index;
            fs.readFile(indexFilePath, function(err: NodeJS.ErrnoException, data: Buffer) {
                index = JSON.parse(data.toString());
                index[object.$id] = {
                    size: bsonBuffer.byteLength,
                    start: index['0'].size,
                    end: bsonBuffer.byteLength + index['0'].size,
                };
                index['0'].size = bsonBuffer.byteLength + index['0'].size;
                fs.writeFileSync(indexFilePath, JSON.stringify(index));
                fs.open(collectionFilePath, 'a+', (error, fd) => {
                    fs.write(fd, bsonBuffer, 0, bsonBuffer.byteLength, index['0'].size - bsonBuffer.byteLength,
                        function(writeError: NodeJS.ErrnoException) {
                            if (err) {
                                return res.status(500).json({message: 'ERROR 0004: Error saving object'});
                            }
                            return res.status(201).json(object);
                        });
                });
            });
        }
    }

    public read(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id = req.params.id;
        let indexFilePath = __dirname + '/../../data/' + req.params.name + '/' + req.params.name + '.json';
        let collectionFilePath = __dirname + '/../../data/' + req.params.name + '/' + req.params.name + '.bson';
        if (fs.existsSync(indexFilePath)) {
            fs.readFile(indexFilePath, function(err: NodeJS.ErrnoException, data: Buffer) {
                let index: Index = JSON.parse(data.toString());
                if (index[id]) {
                    fs.open(collectionFilePath, 'r', (error, fd) => {
                        let buffer = new Buffer(index[id].size);
                        fs.read(fd, buffer, 0, index[id].size, index[id].start, (err, bytes, bsonBuffer) => {
                            const object = BSON.deserialize(buffer);
                            return res.status(200).json(object);
                        });
                    });
                } else {
                    return res.status(404).json('ERROR 0005: document missing');
                }
            });
        } else {
            return res.status(404).json('ERROR 0005: index missing');
        }
    }

}
