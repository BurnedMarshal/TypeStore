import * as express from 'express';
import * as fs from 'fs';
import { BasicRouter } from './basic';

export class CollectionRouter extends BasicRouter {

    constructor() {
        super();
        this.routeBinding();
    }

    private routeBinding() {
        this.router.post('/:name', this.create);
        this.router.delete('/:name', this.drop);
    }

    public create(req: express.Request, res: express.Response, next: express.NextFunction) {
        let collectionPath = __dirname + '/../../data/' + req.params.name;
        if (!fs.existsSync(collectionPath)) {
            fs.mkdir(collectionPath, (err: NodeJS.ErrnoException) => {
              if (err) {
                  return res.status(500).json({message: 'ERROR 0001: failed create collection'});
              }
              return res.status(201).json({message: `Collection ${req.params.name} created`});
            });
        } else {
            return res.status(500).json({message: 'ERROR 0002: collection alredy exist'});
        }
    }

    public drop(req: express.Request, res: express.Response, next: express.NextFunction) {
        let collectionPath = __dirname + '/../../data/' + req.params.name;
        if (!fs.existsSync(collectionPath)) {
            return res.status(500).json({message: `ERROR 0003: collection missing`});
        }
        fs.readdirSync(collectionPath).forEach(function(file, index){
          let curPath = collectionPath + '/' + file;
          fs.unlinkSync(curPath);
        });
        fs.rmdirSync(collectionPath);
        res.status(200).json({message: `Collection ${req.params.name} deleted`});
    }
}
