'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('policyEngine'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('new allocation', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('MainCtrl', {$scope: $scope});
    });

    it('zero allocations', function() {
      expect($scope.allocations.length).toEqual(0);
    });

    it('one new allocation', function() {
      $scope.newAllocation();
      expect($scope.allocations.length).toEqual(1);
      expect($scope.allocations[0].id).toEqual('1');
    });

    it('one new allocation', function() {
      $scope.newAllocation();
      $scope.newAllocation();
      expect($scope.allocations.length).toEqual(2);
      expect($scope.allocations[1].id).toEqual('2');
    });
  });
});
