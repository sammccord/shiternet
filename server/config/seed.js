/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Stall from '../api/stall/stall.model';
import Activity from '../api/activity/activity.model';
import Analytics from '../api/analytics/analytics.model';

Thing.find({}).removeAsync()

User.find({}).removeAsync()

Activity.find({}).removeAsync()
.then(function(){
   Activity.createAsync({
      stallId: 1,
      active: false,
      time: "2015-12-07T17:07:53-07:00"
   }, 
   {
      stallId: 1,
      active: false,
      time: "2015-12-09T17:07:53-07:00"
   },
   {
      stallId: 2,
      active: true,
      time: "2015-12-04T17:07:53-07:00"
   },
   {
      stallId: 2,
      active: true,
      time: "2015-12-05T17:07:53-07:00"
   }
)
});

Stall.find({}).removeAsync()
  .then(function() {
    Stall.createAsync({
      stallId : "1"
    })
    .then(function(thing) {
      console.log(thing);
      console.log('finished populating Stalls');
    });
  });

Analytics.find({}).removeAsync()
  .then(function() {
    Analytics.createAsync({
      cumulativeTime : 0
    })
    .then(function(thing) {
      console.log('finished populating Analytics model');
    });
  });
