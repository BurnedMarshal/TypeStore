"use strict";
var chai = require('chai');
var Server = require('../server');
var Request = require('request');
var assert = chai.assert;
var should = chai.should();
describe('Server running', function () {
    it('Test port', function (done) {
        assert.equal(Server.PORT, 40010, 'Port on TypeStore server match');
        done();
    });
    it('Test index route', function (done) {
        Request.get('http://localhost:40010/', function (err, res, body) {
            should.not.exist(err, 'Erron on index route');
            assert.equal(res.statusCode, 200);
            assert.deepEqual(JSON.parse(body), { message: 'I\'m alive' });
            done();
        });
    });
});
//# sourceMappingURL=server.test.js.map