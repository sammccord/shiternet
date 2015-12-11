'use strict';

describe('Directive: sideMenu', function () {

  // load the directive's module and view
  beforeEach(module('shiternetApp'));
  beforeEach(module('components/sideMenu/sideMenu.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<side-menu></side-menu>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the sideMenu directive');
  }));
});
