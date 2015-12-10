'use strict';

var app = require('../..');
var request = require('supertest');

var newAnalytics;

describe('Analytics API:', function() {

  describe('GET /api/analytics', function() {
    var analyticss;

    beforeEach(function(done) {
      request(app)
        .get('/api/analytics')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          analyticss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      analyticss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/analytics', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/analytics')
        .send({
          name: 'New Analytics',
          info: 'This is the brand new analytics!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newAnalytics = res.body;
          done();
        });
    });

    it('should respond with the newly created analytics', function() {
      newAnalytics.name.should.equal('New Analytics');
      newAnalytics.info.should.equal('This is the brand new analytics!!!');
    });

  });

  describe('GET /api/analytics/:id', function() {
    var analytics;

    beforeEach(function(done) {
      request(app)
        .get('/api/analytics/' + newAnalytics._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          analytics = res.body;
          done();
        });
    });

    afterEach(function() {
      analytics = {};
    });

    it('should respond with the requested analytics', function() {
      analytics.name.should.equal('New Analytics');
      analytics.info.should.equal('This is the brand new analytics!!!');
    });

  });

  describe('PUT /api/analytics/:id', function() {
    var updatedAnalytics

    beforeEach(function(done) {
      request(app)
        .put('/api/analytics/' + newAnalytics._id)
        .send({
          name: 'Updated Analytics',
          info: 'This is the updated analytics!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAnalytics = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAnalytics = {};
    });

    it('should respond with the updated analytics', function() {
      updatedAnalytics.name.should.equal('Updated Analytics');
      updatedAnalytics.info.should.equal('This is the updated analytics!!!');
    });

  });

  describe('DELETE /api/analytics/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/analytics/' + newAnalytics._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when analytics does not exist', function(done) {
      request(app)
        .delete('/api/analytics/' + newAnalytics._id)
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
