'use strict';

function translate(buckets) {
  var retVal = [];
  _.each(buckets,function(bucket, i){
    retVal.push({
      x : bucket.shitStartTime,
      y : bucket.durationMs
    })
  });
  return retVal;
}

angular.module('shiternetApp')
    .controller('StallCtrl', function($scope, $stateParams, $http) {
        $scope.message = 'Hello';
        var id = $stateParams.stallId
        var endDate = moment().valueOf();
        $http.get('/api/analytics/stats/?stallId='+id+'&start=0&end='+endDate+'').then(response => {
          $scope.data = translate(response.data.stats.buckets);
          console.log($scope.data);
          $scope.data = [
            {
                "key" : "TIS (Time in Stall)" ,
                "bar": true,
                "values" : translate(response.data.stats.buckets)
            }];
        });
        $http.get('/api/stalls/'+id).then(response => {
          console.log(response.data);
          $scope.stall = response.data;
        });
        $http.get('/api/analytics/metrics/?stallId='+id+'&start=0&end='+endDate+'').then(response => {
          $scope.min = moment.duration(response.data.min, "milliseconds").humanize();
          $scope.max = moment.duration(response.data.max, "milliseconds").humanize();
        });
        $scope.options = {
          chart: {
              type: 'historicalBarChart',
              height: 450,
              margin : {
                  top: 20,
                  right: 20,
                  bottom: 65,
                  left: 100
              },
              x: function(d){return d.x;},
              y: function(d){return d.y;},
              showValues: true,
              valueFormat: function(d){
                  return moment.duration(d, "milliseconds").humanize()
              },
              duration: 100,
              xAxis: {
                  axisLabel: 'Time',
                  tickFormat: function(d) {
                      return moment(d).format("MM-DD-YY HH:MM")
                  },
                  rotateLabels: 15,
                  showMaxMin: false
              },
              yAxis: {
                  axisLabel: 'TIS (Time in Stall)',
                  axisLabelDistance: -10,
                  tickFormat: function(d){
                      return moment.duration(d, "milliseconds").humanize()
                  }
              },
              tooltip: {
                  keyFormatter: function(d) {
                      return moment(d).format("MM-DD-YY HH:MM") + " 💩 "
                  }
              },
              zoom: {
                  enabled: true,
                  scaleExtent: [1, 10],
                  useFixedDomain: false,
                  useNiceScale: false,
                  horizontalOff: false,
                  verticalOff: true,
                  unzoomEventType: 'dblclick.zoom'
              }
          }
        };
});
