import { Router } from 'express';

export class BasicRouter {
    public router: Router;
    constructor() {
        this.router = Router();
    }
}