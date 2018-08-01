import * as express from 'express';
import { BasicRouter } from './basic';

export class IndexRouter extends BasicRouter {
    
    constructor() {
      super();
      this.routeBinding();
    }

    private routeBinding() {
      this.router.get('/', this.index);
    }
    public index(req: express.Request, res: express.Response, next: express.NextFunction) {
      res.status(200).json({message: 'I\'m alive'});
    }
}
