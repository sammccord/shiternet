/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/activity              ->  index
 * POST    /api/activity              ->  create
 * GET     /api/activity/:id          ->  show
 * PUT     /api/activity/:id          ->  update
 * DELETE  /api/activity/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Activity = require('./activity.model');

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

// Gets a list of Activitys
exports.index = function(req, res) {
  Activity.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Activity from the DB
exports.show = function(req, res) {
  Activity.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Activity in the DB
exports.create = function(req, res) {
  Activity.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Activity in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Activity.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Activity from the DB
exports.destroy = function(req, res) {
  Activity.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
