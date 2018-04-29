import * as path from 'path';
import express from "express";
import * as bodyParser from 'body-parser';

import { Collection } from './routes/collections';
import { Index } from './routes';
import { ObjectDocument } from './routes/objects';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    // this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();

    const collectionRoutes: Collection = new Collection();
    const indexRoutes: Index = new Index();
    const objectRoutes: ObjectDocument = new ObjectDocument();

    router.get('/', indexRoutes.index.bind(indexRoutes.index));
    router.post('/collections/:name', collectionRoutes.create.bind(collectionRoutes.create));
    router.delete('/collections/:name', collectionRoutes.drop.bind(collectionRoutes.drop));
    router.post('/:name', objectRoutes.create.bind(objectRoutes.create));
    router.get('/:name/:id', objectRoutes.read.bind(objectRoutes.read));
    // placeholder route handler
    this.express.use('/', router);
  }

}

export default new App().express;