/**
 * Stall model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Stall = require('./stall.model');
var StallEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StallEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Stall.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    StallEvents.emit(event + ':' + doc._id, doc);
    StallEvents.emit(event, doc);
  }
}

module.exports = StallEvents;
