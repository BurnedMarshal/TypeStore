import * as chai from 'chai';
import * as Server from '../server';
import * as Request from 'request';
import {IncomingMessage} from 'http';

const assert = chai.assert;
const should = chai.should();

describe('Server running', () => {

    it('Test port', function(done: MochaDone): void {
        assert.equal(Server.PORT, 40010, 'Port on TypeStore server match');
        done();
    });

    it('Test index route', function(done: MochaDone): void {
        Request.get('http://localhost:40010/', (err: any, res: IncomingMessage, body: string): void => {
            should.not.exist(err, 'Erron on index route');
            assert.equal(res.statusCode, 200);
            assert.deepEqual(JSON.parse(body), {message: 'I\'m alive'});
            done();
        });
    });

    let collectionName: string = 'test';

    it('Create collection', function(done: MochaDone): void {
        Request.post('http://localhost:40010/collections/' + collectionName,
        (err: any, res: IncomingMessage, body: string): void => {
            should.not.exist(err, 'Erron on index route');
            assert.equal(res.statusCode, 201);
            assert.deepEqual(JSON.parse(body), {message: `Collection ${collectionName} created`});
            done();
        });
    });

    it('Collection alredy exist', function(done: MochaDone): void {
        Request.post('http://localhost:40010/collections/' + collectionName,
        (err: any, res: IncomingMessage, body: string): void => {
            should.not.exist(err, 'Error on index route');
            assert.equal(res.statusCode, 500);
            assert.deepEqual(JSON.parse(body), {message: 'ERROR 0002: collection alredy exist'});
            done();
        });
    });

    it('Drop collection', function(done: MochaDone): void {
        Request.del('http://localhost:40010/collections/' + collectionName,
        (err: any, res: IncomingMessage, body: string): void => {
            should.not.exist(err, 'Erron on index route');
            assert.equal(res.statusCode, 200);
            assert.deepEqual(JSON.parse(body), {message: `Collection ${collectionName} deleted`});
            done();
        });
    });

    it('Drop not existing collection', function(done: MochaDone): void {
        Request.del('http://localhost:40010/collections/' + collectionName,
        (err: any, res: IncomingMessage, body: string): void => {
            should.not.exist(err, 'Erron on index route');
            assert.equal(res.statusCode, 500);
            assert.deepEqual(JSON.parse(body), {message: `ERROR 0003: collection missing`});
            done();
        });
    });
});
