import * as express from 'express';

export class Index {
    public index(req: express.Request, res: express.Response, next: express.NextFunction) {
      res.status(200).json({message: 'I\'m alive'});
    }

    public save(req: express.Request, res: express.Response, next: express.NextFunction) {
      console.log(req.params)
      res.status(200).json({message: 'I\'m alive'});
    }
}
