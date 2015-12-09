'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var stallCtrlStub = {
  index: 'stallCtrl.index',
  show: 'stallCtrl.show',
  create: 'stallCtrl.create',
  update: 'stallCtrl.update',
  destroy: 'stallCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var stallIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './stall.controller': stallCtrlStub
});

describe('Stall API Router:', function() {

  it('should return an express router instance', function() {
    stallIndex.should.equal(routerStub);
  });

  describe('GET /api/stalls', function() {

    it('should route to stall.controller.index', function() {
      routerStub.get
        .withArgs('/', 'stallCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/stalls/:id', function() {

    it('should route to stall.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'stallCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/stalls', function() {

    it('should route to stall.controller.create', function() {
      routerStub.post
        .withArgs('/', 'stallCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/stalls/:id', function() {

    it('should route to stall.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'stallCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/stalls/:id', function() {

    it('should route to stall.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'stallCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/stalls/:id', function() {

    it('should route to stall.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'stallCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
