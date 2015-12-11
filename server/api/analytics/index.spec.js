'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var analyticsCtrlStub = {
  index: 'analyticsCtrl.index',
  show: 'analyticsCtrl.show',
  create: 'analyticsCtrl.create',
  update: 'analyticsCtrl.update',
  destroy: 'analyticsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var analyticsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './analytics.controller': analyticsCtrlStub
});

describe('Analytics API Router:', function() {

  it('should return an express router instance', function() {
    analyticsIndex.should.equal(routerStub);
  });

  describe('GET /api/analytics', function() {

    it('should route to analytics.controller.index', function() {
      routerStub.get
        .withArgs('/', 'analyticsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/analytics/:id', function() {

    it('should route to analytics.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'analyticsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/analytics', function() {

    it('should route to analytics.controller.create', function() {
      routerStub.post
        .withArgs('/', 'analyticsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/analytics/:id', function() {

    it('should route to analytics.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'analyticsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/analytics/:id', function() {

    it('should route to analytics.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'analyticsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/analytics/:id', function() {

    it('should route to analytics.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'analyticsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
