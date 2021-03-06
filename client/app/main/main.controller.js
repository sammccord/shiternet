'use strict';

(function() {

var availableSayings = [
    "Now's the time.",
    "Get get'er tiger.",
    "She's all yours.",
    "Yep.",
    "If you don't go after what you want, you'll never have it.",
    "Don't let your dreams be dreams."
  ]

  var occupiedSayings = [
    'No poop for you',
    "Hold it.",
    "Waiting is the hardest part.",
    "Nope.",
    "Occupado"
  ]

class MainController {

  constructor($http, $scope, socket, $location, $state) {
    this.$http = $http;
    this.$scope = $scope;
    this.$location = $location;
    this.available = true;
    this.$state = $state;
    this.body = angular.element('body');

    $http.get('/api/stalls').then(response => {
      this.stalls = response.data;
      this.updateStatus();
      socket.syncUpdates('stall', this.stalls, () => this.updateStatus());
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('stall');
    });

    $scope.$watch("main.stalls", function(newVal,oldVal) {
      console.log(newVal, oldVal);
    })
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/stalls', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/stalls/' + thing._id);
  }

  redirect(id){
    this.body.removeClass('unavailable');
    this.$state.go("stall", {"stallId" : id})
  }

  updateStatus() {
    var activeCount = this.stalls.reduce(function(prev, curr){
      if(!curr.active) return prev+1;
      else return prev;
    }, 0);
    if(activeCount > 0){
      this.available = true;
      this.body.removeClass('unavailable');
      this.saying = availableSayings[Math.floor(Math.random()*availableSayings.length)];
    }
    else {
      this.available = false;
      this.body.addClass('unavailable');
      this.saying = occupiedSayings[Math.floor(Math.random()*occupiedSayings.length)];
    }
  }
}

angular.module('shiternetApp')
  .controller('MainController', MainController);

})();
