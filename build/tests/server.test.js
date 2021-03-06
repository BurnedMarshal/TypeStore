"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as chai from 'chai';
var App_1 = __importDefault(require("../App"));
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;
describe('Server running', function () {
    it('Test index route', function (done) {
        chai.request(App_1.default).get('/').then(function (res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, { message: 'I\'m alive' });
            done();
        });
    });
    var collectionName = 'test';
    it('Create collection', function (done) {
        chai.request(App_1.default).post('/collections/' + collectionName).then(function (res) {
            assert.equal(res.status, 201);
            assert.deepEqual(res.body, { message: "Collection " + collectionName + " created" });
            done();
        });
    });
    it('Collection alredy exist', function (done) {
        chai.request(App_1.default).post('/collections/' + collectionName).then(function (res) {
            assert.equal(res.status, 500);
            assert.deepEqual(res.body, { message: 'ERROR 0002: collection alredy exist' });
            done();
        });
    });
    it('Drop collection', function (done) {
        chai.request(App_1.default).delete('/collections/' + collectionName).then(function (res) {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, { message: "Collection " + collectionName + " deleted" });
            done();
        });
    });
    it('Drop not existing collection', function (done) {
        chai.request(App_1.default).delete('/collections/' + collectionName).then(function (res) {
            assert.equal(res.status, 500);
            assert.deepEqual(res.body, { message: "ERROR 0003: collection missing" });
            done();
        });
    });
});
//# sourceMappingURL=server.test.js.map