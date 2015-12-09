'use strict';

angular.module('shitternetApp.auth', [
  'shitternetApp.constants',
  'shitternetApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
