/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/stalls              ->  index
 * POST    /api/stalls              ->  create
 * GET     /api/stalls/:id          ->  show
 * PUT     /api/stalls/:id          ->  update
 * DELETE  /api/stalls/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Stall = require('./stall.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Stalls
exports.index = function(req, res) {
  Stall.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Stall from the DB
exports.show = function(req, res) {
  Stall.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Stall in the DB
exports.create = function(req, res) {
  if(!req.body.stallId) {
    return responseWithResult(res, 500)({});
  }
  if(typeof req.body.active === "string"){
    if(req.body.active === "True"){
      req.body.active = true;
    } else if(req.body.active === "False"){
      req.body.active = false;
    }
  }
  Stall.findOneAndUpdate({
    "stallId": req.body.stallId
  }, req.body , {
    upsert:true,
    new:true
  },
  function(err, stall){
    if(err) return responseWithResult(res, 500)({});
    stall.saveAsync();
    return responseWithResult(res, 201)(stall);
  });
  // .then(responseWithResult(res, 201))
  // .catch(handleError(res));
};

// Updates an existing Stall in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Stall.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Stall from the DB
exports.destroy = function(req, res) {
  Stall.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
