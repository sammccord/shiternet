'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var AnalyticsSchema = new Schema({
  cumulativeTime : { type: Number, default: 0 }
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
