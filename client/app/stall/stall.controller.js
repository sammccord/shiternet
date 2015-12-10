'use strict';

angular.module('shiternetApp')
  .controller('StallCtrl', function ($scope, $stateParams) {
    $scope.message = 'Hello';
    console.log($stateParams.stallId)
  });
