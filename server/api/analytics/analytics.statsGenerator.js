'use strict';

var _ = require('lodash');
var Activity = require('../activity/activity.model');
var moment = require('moment');

// Constructor
function StatsGenerator(timeRange) {
  // always initialize all instance properties
  this.timeRange = timeRange ? timeRange : '24h'
}
// class methods
StatsGenerator.prototype.giveMeStats = function(start, end, stallId, done) {
   var self = this;
    
   Activity.find(
      {
         stallId : stallId, 
         time: {
            $gte : moment(Number(start*1000)).toISOString(),
            $lte : moment(Number(end*1000)).toISOString()
         }
         
      }, function(error, activities){
         var buckets = self.giveMeBucketsFromActivities(activities, start, end);
         done(buckets);
      })
};


StatsGenerator.prototype.giveMeBucketsFromActivities = function(activities, start, end){
   return {
      start: start,
      end: end,
      buckets: [
         {"2015-12-10T00:07:53.000Z" : 420},
         {"2015-12-10T00:08:53.000Z" : 123},
         {"2015-12-10T00:09:53.000Z" : 431412343120},
         {"2015-12-10T00:10:53.000Z" : 234},
         {"2015-12-10T00:11:53.000Z" : 422340},
         {"2015-12-10T00:12:53.000Z" : 4256760},
         {"2015-12-10T00:13:53.000Z" : 720},
         {"2015-12-10T00:14:53.000Z" : 4320},
         {"2015-12-10T00:15:53.000Z" : 120}]
   };
}

StatsGenerator.prototype.getTimeRangeFromChar = function(timeRange) {
   
   var epoch = new Date().getTime() / 1000;
   var hour = (60 * 60);
   var day = (hour * 24);
   var week = (day * 7);
   var month = (day * 30);
   
   switch (timeRange){
      case 'h':
         return {start: epoch-hour, end: epoch };
      case 'd':
         return {start: epoch-day, end: epoch };
      case 'w':
         return {start: epoch-week, end: epoch };
      case 'm':
         return {start: epoch-month, end: epoch };
      default:
         return {start: 0, end: epoch}
   }

};
// export the class
module.exports = StatsGenerator;
