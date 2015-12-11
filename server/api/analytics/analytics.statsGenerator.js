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
         // console.log(activities);
         var buckets = self.giveMeBucketsFromActivities(activities, start, end);
         done(buckets);
      });
};


StatsGenerator.prototype.giveMeShitTimesForRange = function(activities, start, end){
   // var times = {      
   //       start: start,
   //       end: end,
   //       buckets: []
   // };
   // _.each(activities, function(activity){
   //    start.buckets.push(activity)
   // });
   // 
   
   
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

// export the class
module.exports = StatsGenerator;
