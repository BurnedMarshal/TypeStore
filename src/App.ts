import * as path from 'path';
import express from "express";
import * as bodyParser from 'body-parser';

import { CollectionRouter } from './routes/collections';
import { IndexRouter } from './routes';
import * as logger from './logger';

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

    const collectionRoutes: CollectionRouter = new CollectionRouter();
    const indexRoutes: IndexRouter = new IndexRouter();

    router.use('/', indexRoutes.router);
    router.use('/collections/', collectionRoutes.router);
    // placeholder route handler
    this.express.use('/', router);
  }

}

export default new App().express;