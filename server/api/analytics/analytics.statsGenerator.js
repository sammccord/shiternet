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
StatsGenerator.prototype.getShitsForRange = function(start, end, stallId, done) {
   var self = this;
    
   Activity.find(
      {
         stallId : stallId, 
         time: {
            $gte : moment(Number(start)).toISOString(),
            $lte : moment(Number(end)).toISOString()
         }
      }).sort({time: 1}).exec(function(error, activities){
          done(activities);
      });
};

StatsGenerator.prototype.giveMeStats = function(start, end, stallId, done) {
   var self = this;
   self.getShitsForRange(start, end, stallId, function(activities){
      var buckets = self.giveMeShitTimesForRange(activities, start, end);
      done(buckets);
   });
};

StatsGenerator.prototype.getMinAndMaxShitTime = function(start, end, stallId, done){

   var self = this;
   
   self.getShitsForRange(start, end, stallId, function(activities){
      var shitData = self.giveMeShitTimesForRange(activities, start, end);
      var sortedShits = _.pluck(_.sortBy(shitData.buckets, 'durationMs'), 'durationMs');
      var metrics = {
         min: sortedShits[0],
         max: sortedShits[sortedShits.length-1]
      }
      done(metrics);
   });
}



StatsGenerator.prototype.giveMeShitTimesForRange = function(activities, start, end){
   var shitData = {      
         start: start,
         end: end,
         buckets: []
   };
   var tempArr = []
   var previousClosedTime= null;
   _.each(activities, function(activity){
      if (activity.active) {// it's closed
         previousClosedTime = activity.time;   
      } else {// it's open
         if (previousClosedTime){
            var shitTime = moment(activity.time).diff(previousClosedTime);
            shitData.buckets.push({
               shitStartTime : previousClosedTime.valueOf(),
               shitEndTime   : activity.time.valueOf(),
               durationMs    : shitTime
            });
         }
      }
   });
   return shitData;
}



// export the class
module.exports = StatsGenerator;
