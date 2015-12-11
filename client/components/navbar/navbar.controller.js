'use strict';

class NavbarController {
  constructor($location, $state) {
    this.$location = $location;
    this.$el = angular.element("#navbar");
    this.main = angular.element("#main");
    this.active = false;
    this.$state = $state;
    console.log($state)
  }

  toggleSidebar() {
    this.active = !this.active;
    if(this.active){
      this.$el.addClass("active");
      this.main.addClass("active");
    }
    else{
      this.$el.removeClass("active");
      this.main.removeClass("active");
    }
  }

  goHome() {
    this.$state.go('main')
  }
}

angular.module('shiternetApp')
  .controller('NavbarController', NavbarController);
