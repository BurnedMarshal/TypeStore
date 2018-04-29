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

    let savedObjects: any = [];

    it('Saving Object', function(done: MochaDone): void {
        let object: any = {
            name: 'Daniele',
            value: 10,
            boolean: true
        }
        chai.request(App).post('/' + collectionName).send(object).then((res: Response) => {
            assert.equal(res.status, 201);
            expect(res.body).have.property('$id');
            const data: any = res.body;
            if (data) object['$id'] = data.$id;
            expect(res.body).to.be.deep.equal(object);
            savedObjects.push(object);
            done();
        });
    });

    it('Saving Object Append', function(done: MochaDone): void {
        let object: any = {
            name: 'Daniele',
            value: 12,
            boolean: false
        }
        chai.request(App).post('/' + collectionName).send(object).then((res: Response) => {
            assert.equal(res.status, 201);
            expect(res.body).have.property('$id');
            const data: any = res.body;
            if (data) object['$id'] = data.$id;
            expect(res.body).to.be.deep.equal(object);
            savedObjects.push(object);
            done();
        });
    });

    it('Read Object', function(done: MochaDone): void {
        chai.request(App).get('/' + collectionName + '/' + savedObjects[1].$id).then((res: Response) => {
            assert.equal(res.status, 200);
            expect(res.body).to.be.deep.equal(savedObjects[1]);
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
