'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  stallId: String,
  active: Boolean,
  time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', ActivitySchema);
