// import * as chai from 'chai';
import App from '../App';
import { ObjectId } from 'bson';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;

describe('Server running', () => {

    it('Test index route', function(done) {
        chai.request(App).get('/').then( (res: Response) => {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {message: 'I\'m alive'});
            done();
        });
    });

    let collectionName: string = 'test';

    it('Create collection', function(done: MochaDone): void {
        chai.request(App).post('/collections/' + collectionName).then((res: Response) => {
            assert.equal(res.status, 201);
            assert.deepEqual(res.body, {message: `Collection ${collectionName} created`});
            done();
        });
    });

    it('Collection alredy exist', function(done: MochaDone): void {
        chai.request(App).post('/collections/' + collectionName).then((res: Response) => {
            assert.equal(res.status, 500);
            assert.deepEqual(res.body, {message: 'ERROR 0002: collection alredy exist'});
            done();
        });
    });

    it('Drop collection', function(done: MochaDone): void {
        chai.request(App).delete('/collections/' + collectionName).then((res: Response) => {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {message: `Collection ${collectionName} deleted`});
            done();
        });
    });

    it('Drop not existing collection', function(done: MochaDone): void {
        chai.request(App).delete('/collections/' + collectionName).then((res: Response) => {
            assert.equal(res.status, 500);
            assert.deepEqual(res.body, {message: `ERROR 0003: collection missing`});
            done();
        });
    });
});
