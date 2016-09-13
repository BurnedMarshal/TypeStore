import Logger from './logger';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as indexRoute from './routes/index';
import * as collectionsRoute from './routes/collections';
import * as objectRoute from './routes/objects';

class Server {

    public static bootstrap(): Server {
        return new Server();
    }

    public PORT: number = 40010;
    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());

        this.routes();

        this.app.listen(this.PORT, () => {
            Logger.info('TypeData running on port ', this.PORT);
        });
    }

    private routes(): void {
        // get router
        let router: express.Router;
        router = express.Router();

        // create routes
        let index: indexRoute.Index = new indexRoute.Index();
        let collections: collectionsRoute.Collection = new collectionsRoute.Collection();
        let objects: objectRoute.Object = new objectRoute.Object();

        router.get('/', index.index.bind(index.index));
        // router.post('/', index.save.bind(index.save));

        // Collections
        router.post('/collections/:name', collections.create.bind(collections.create));
        router.delete('/collections/:name', collections.drop.bind(collections.drop));

        // Objects
        router.post('/:name', objects.create.bind(objects.create));

        this.app.use(router);
    }
}

let typeStore = Server.bootstrap();

export = typeStore;
