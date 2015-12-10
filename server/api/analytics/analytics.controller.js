/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/analytics              ->  index
 * POST    /api/analytics              ->  create
 * GET     /api/analytics/:id          ->  show
 * PUT     /api/analytics/:id          ->  update
 * DELETE  /api/analytics/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Analytics = require('./analytics.model');
import config from '../../config/environment';

var Twit = require('twit')

var T = new Twit({
    consumer_key:         config.TWITTER_CONSUMER
  , consumer_secret:      config.TWITTER_SECRET
  , access_token:         config.TWITTER_TOKEN
  , access_token_secret:  config.TWITTER_ACCESS
})

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

// Gets a list of Analyticss
exports.index = function(req, res) {
  Analytics.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Analytics from the DB
exports.show = function(req, res) {
  Analytics.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Analytics in the DB
exports.create = function(req, res) {
  Analytics.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Analytics in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Analytics.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Analytics from the DB
exports.destroy = function(req, res) {
  Analytics.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
