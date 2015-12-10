'use strict';

var app = require('../..');
var request = require('supertest');

var newActivity;

describe('Activity API:', function() {

  describe('GET /api/activity', function() {
    var activitys;

    beforeEach(function(done) {
      request(app)
        .get('/api/activity')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          activitys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      activitys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/activity', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/activity')
        .send({
          name: 'New Activity',
          info: 'This is the brand new activity!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newActivity = res.body;
          done();
        });
    });

    it('should respond with the newly created activity', function() {
      newActivity.name.should.equal('New Activity');
      newActivity.info.should.equal('This is the brand new activity!!!');
    });

  });

  describe('GET /api/activity/:id', function() {
    var activity;

    beforeEach(function(done) {
      request(app)
        .get('/api/activity/' + newActivity._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          activity = res.body;
          done();
        });
    });

    afterEach(function() {
      activity = {};
    });

    it('should respond with the requested activity', function() {
      activity.name.should.equal('New Activity');
      activity.info.should.equal('This is the brand new activity!!!');
    });

  });

  describe('PUT /api/activity/:id', function() {
    var updatedActivity

    beforeEach(function(done) {
      request(app)
        .put('/api/activity/' + newActivity._id)
        .send({
          name: 'Updated Activity',
          info: 'This is the updated activity!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedActivity = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedActivity = {};
    });

    it('should respond with the updated activity', function() {
      updatedActivity.name.should.equal('Updated Activity');
      updatedActivity.info.should.equal('This is the updated activity!!!');
    });

  });

  describe('DELETE /api/activity/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/activity/' + newActivity._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when activity does not exist', function(done) {
      request(app)
        .delete('/api/activity/' + newActivity._id)
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
