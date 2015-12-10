'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, $location) {
    this.$http = $http;
    this.$location = $location;
    this.awesomeThings = [];

    $http.get('/api/stalls').then(response => {
      this.stalls = response.data;
      socket.syncUpdates('stall', this.stalls);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('stall');
    });
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
    console.log(id)
    this.$location.path("/stall/"+id)
  }
}

angular.module('shiternetApp')
  .controller('MainController', MainController);

})();
