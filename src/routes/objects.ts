import * as express from 'express';
import * as fs from 'fs';
import * as bson from 'bson';

let BSON = new bson.BSONPure.BSON();

export class Object {

    public create(req: express.Request, res: express.Response, next: express.NextFunction) {
        let object = req.body;
        console.log(object);
        let newBson: any = {};
        for(let prop in object) {
            if(typeof prop === 'boolean' || typeof prop === 'string') {
                newBson[prop] = object[prop];
            } else if (typeof prop === 'number') {
                newBson[prop] = bson.BSONPure.Long.fromNumber(object[prop]);
            }
        }
        object.$id = bson.BSONPure.ObjectID.createFromTime(Date.now());
        newBson.$id = object.$id;
        let bsonBuffer = BSON.serialize(newBson, false, true, false);
        let indexFilePath = __dirname + '/../../data/' + req.params.name + '/' + req.params.name + '.json';
        let collectionFilePath = __dirname + '/../../data/' + req.params.name + '/' + req.params.name + '.bson';
        if (!fs.existsSync(indexFilePath)) {
            let index : any = {};
            index[object.$id] = {size: bsonBuffer.byteLength, start: 0, end: bsonBuffer.byteLength};

            var json = JSON.stringify(index);
            fs.writeFile(indexFilePath, json);
            fs.open(collectionFilePath, 'wx', (err, fd) => {
                fs.write(fd, bsonBuffer, 0, bsonBuffer.byteLength, function(err: NodeJS.ErrnoException) {
                    if(err) {
                        return res.status(500).json({message: 'ERROR 0004: Error saving object'});
                    }
                    return res.status(201).json({message: 'Object created'});
                })
            });
        } else {
            // TODO: Append data to file.
        }
    }

}
