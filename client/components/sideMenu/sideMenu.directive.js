'use strict';

angular.module('shiternetApp')
  .directive('sideMenu', () => ({
    templateUrl: 'components/sideMenu/sideMenu.html',
    restrict: 'E',
    controller: 'SideMenuController',
    controllerAs: 'side',
    bindToController : {
      active: "="
    }
  }));
