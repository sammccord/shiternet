'use strict';

angular.module('shiternetApp.auth', [
  'shiternetApp.constants',
  'shiternetApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
