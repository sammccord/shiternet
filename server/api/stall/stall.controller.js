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
var Analytics = require('../analytics/analytics.model');
var moment = require('moment');

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

function addToCumulativeTime(stall) {
  if(stall.active === false){
    Stall.findById(stall._id)
    .populate('activity')
    .exec(function(err, stall){
      var lastOpen = stall.activity[stall.activity.length -1];
      var lastClosed = stall.activity[stall.activity.length -2];
      if(lastOpen && lastClosed) {
        var duration = moment.duration(moment(lastOpen.time).diff(moment(lastClosed.time)));
        var seconds = duration.seconds();
        Analytics.findOne(function(err, analytics){
          var count = analytics.cumulativeTime + seconds;
          analytics.cumulativeTime = count;
          analytics.save(function(err, analytics){
            console.log(analytics);
          });
        });
      }
    });
  }
}

// Gets a list of Stalls
exports.index = function(req, res) {
  Stall.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Stall from the DB
exports.show = function(req, res) {
  Stall.findOneAsync({
    stallId: req.params.id
  })
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
  if(req.body.handicapped && typeof req.body.handicapped === "string"){
    if(req.body.handicapped === "True"){
      req.body.handicapped = true;
    } else if(req.body.handicapped === "False"){
      req.body.handicapped = false;
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
    addToCumulativeTime(stall);
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
