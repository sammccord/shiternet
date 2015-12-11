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
            $gte : moment(Number(start)).toISOString(),
            $lte : moment(Number(end)).toISOString()
         }
         
      }).sort({time: 1}).exec(function(error, activities){
         console.log('activities after search', activities);
         var buckets = self.giveMeShitTimesForRange(activities, start, end);
         done(buckets);
      });
};


StatsGenerator.prototype.giveMeShitTimesForRange = function(activities, start, end){
   var times = {      
         start: start,
         end: end,
         buckets: []
   };
   console.log('activities', activities);
   var tempArr = []
   var previousClosedTime= null;
   _.each(activities, function(activity){
      console.log('currentActivitiy', activity);
      if (!activity.active) {// it's closed
         console.log('previousClosedTime to ', activity.time);
         previousClosedTime = activity.time;   
      } else {// it's open
         if (previousClosedTime){
            var shitTime = moment(activity.time).diff(previousClosedTime);
            console.log('shit time:', shitTime); 
         }
      }
   });
   
   
   
   return {
      start: start,
      end: end,
      buckets: [
         {time: "2015-12-10T00:07:53.000Z", duration : 420},
         {time: "2015-12-10T00:08:53.000Z", duration : 123},
         {time: "2015-12-10T00:09:53.000Z", duration: 431412343120},
         {time: "2015-12-10T00:10:53.000Z", duration: 234},
         {time: "2015-12-10T00:11:53.000Z", duration: 422340},
         {time: "2015-12-10T00:12:53.000Z", duration: 4256760},
         {time: "2015-12-10T00:13:53.000Z", duration: 720},
         {time: "2015-12-10T00:14:53.000Z", duration: 4320},
         {time: "2015-12-10T00:15:53.000Z", duration: 120}]
   };
}

// export the class
module.exports = StatsGenerator;
