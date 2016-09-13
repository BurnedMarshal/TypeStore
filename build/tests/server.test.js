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
    var collectionName = 'test';
    it('Create collection', function (done) {
        Request.post('http://localhost:40010/collections/' + collectionName, function (err, res, body) {
            should.not.exist(err, 'Erron on index route');
            assert.equal(res.statusCode, 201);
            assert.deepEqual(JSON.parse(body), { message: "Collection " + collectionName + " created" });
            done();
        });
    });
    it('Collection alredy exist', function (done) {
        Request.post('http://localhost:40010/collections/' + collectionName, function (err, res, body) {
            should.not.exist(err, 'Error on index route');
            assert.equal(res.statusCode, 500);
            assert.deepEqual(JSON.parse(body), { message: 'ERROR 0002: collection alredy exist' });
            done();
        });
    });
    it('Drop collection', function (done) {
        Request.del('http://localhost:40010/collections/' + collectionName, function (err, res, body) {
            should.not.exist(err, 'Erron on index route');
            assert.equal(res.statusCode, 200);
            assert.deepEqual(JSON.parse(body), { message: "Collection " + collectionName + " deleted" });
            done();
        });
    });
    it('Drop not existing collection', function (done) {
        Request.del('http://localhost:40010/collections/' + collectionName, function (err, res, body) {
            should.not.exist(err, 'Erron on index route');
            assert.equal(res.statusCode, 500);
            assert.deepEqual(JSON.parse(body), { message: "ERROR 0003: collection missing" });
            done();
        });
    });
});
//# sourceMappingURL=server.test.js.map