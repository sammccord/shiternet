'use strict';

describe('Controller: StallCtrl', function () {

  // load the controller's module
  beforeEach(module('shiternetApp'));

  var StallCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StallCtrl = $controller('StallCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
