'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('policyEngine'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('main ctrl', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('MainCtrl', {$scope: $scope});
    });

 });
});
