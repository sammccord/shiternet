'use strict';

angular.module('shiternetApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('stall', {
        url: '/stall/:stallId',
        templateUrl: 'app/stall/stall.html',
        controller: 'StallCtrl'
      });
  });
