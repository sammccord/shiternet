/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Stall from '../api/stall/stall.model';
import Activity from '../api/activity/activity.model';

Thing.find({}).removeAsync()
  .then(function() {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });

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
