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
});
