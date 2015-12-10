'use strict';

class SideMenuController {
  constructor($scope) {
    $scope.$watch("side.active", (val) => this.activeToggle(val))
    this.$el = angular.element("#side-menu");
  }

  activeToggle(val) {
    if(val) this.$el.addClass("active")
    else this.$el.removeClass("active")
  }
}

angular.module('shiternetApp')
  .controller('SideMenuController', SideMenuController);
