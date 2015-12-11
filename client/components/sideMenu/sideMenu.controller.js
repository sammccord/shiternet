'use strict';

const SALARY = 92660;
var format = d3.format(",.2f");

class SideMenuController {
  constructor($scope, $http, socket) {
    this.$http = $http;
    $scope.$watch("side.active", (val) => this.activeToggle(val))
    this.$el = angular.element("#side-menu");

    $http.get('/api/analytics').then(response => {
      this.analytics = [response.data];
      this.updateAnalytics();
      socket.syncUpdates('analytics', this.analytics, () => this.updateAnalytics());
    });
  }

  activeToggle(val) {
    if(val) this.$el.addClass("active")
    else this.$el.removeClass("active")
  }

  updateAnalytics() {
    console.log(this.analytics);
  }

  getTime() {
    if(!this.analytics) return "";
    return moment.duration(this.analytics[0].cumulativeTime, "seconds").humanize()
  }

  getMoneyWasted() {
    if(!this.analytics) return "";
    var perMinute = .75;
    var totalMinutes = parseInt(this.analytics[0].cumulativeTime / 60);
    return "$"+ format(perMinute * totalMinutes);
  }
}

angular.module('shiternetApp')
  .controller('SideMenuController', SideMenuController);
