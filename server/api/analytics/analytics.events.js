/**
 * Analytics model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Analytics = require('./analytics.model');
var AnalyticsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AnalyticsEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Analytics.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AnalyticsEvents.emit(event + ':' + doc._id, doc);
    AnalyticsEvents.emit(event, doc);
  }
}

module.exports = AnalyticsEvents;
