'use strict';

var app = require('../..');
var request = require('supertest');

var newStall;

describe('Stall API:', function() {

  describe('GET /api/stalls', function() {
    var stalls;

    beforeEach(function(done) {
      request(app)
        .get('/api/stalls')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          stalls = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      stalls.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/stalls', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/stalls')
        .send({
          name: 'New Stall',
          info: 'This is the brand new stall!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newStall = res.body;
          done();
        });
    });

    it('should respond with the newly created stall', function() {
      newStall.name.should.equal('New Stall');
      newStall.info.should.equal('This is the brand new stall!!!');
    });

  });

  describe('GET /api/stalls/:id', function() {
    var stall;

    beforeEach(function(done) {
      request(app)
        .get('/api/stalls/' + newStall._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          stall = res.body;
          done();
        });
    });

    afterEach(function() {
      stall = {};
    });

    it('should respond with the requested stall', function() {
      stall.name.should.equal('New Stall');
      stall.info.should.equal('This is the brand new stall!!!');
    });

  });

  describe('PUT /api/stalls/:id', function() {
    var updatedStall

    beforeEach(function(done) {
      request(app)
        .put('/api/stalls/' + newStall._id)
        .send({
          name: 'Updated Stall',
          info: 'This is the updated stall!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedStall = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStall = {};
    });

    it('should respond with the updated stall', function() {
      updatedStall.name.should.equal('Updated Stall');
      updatedStall.info.should.equal('This is the updated stall!!!');
    });

  });

  describe('DELETE /api/stalls/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/stalls/' + newStall._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when stall does not exist', function(done) {
      request(app)
        .delete('/api/stalls/' + newStall._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
