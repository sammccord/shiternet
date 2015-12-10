'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Activity = require('../activity/activity.model.js');
var Schema = mongoose.Schema;

var StallSchema = new Schema({
  stallId: String,
  info: { type: String, default: "" },
  active: { type: Boolean, default: false },
  activity: [{ type: Schema.Types.ObjectId, ref: "Activity" }]
});

StallSchema
  .pre('save', function(next) {
    var _this = this;
    Activity.createAsync({
      active : this.active,
      stallId : this.stallId
    }).then(function(activity){
      var tmp = _this.activity;
      tmp.push(activity._id);
      _this.activity = tmp;
      next();
    });
  }
);

module.exports = mongoose.model('Stall', StallSchema);
