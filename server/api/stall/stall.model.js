'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var StallSchema = new Schema({
  stallId: String,
  info: String,
  active: Boolean,
  activity: Array
});

// Activities
// {
//   status : 'open',
//   time : 12936790307
// }

module.exports = mongoose.model('Stall', StallSchema);
