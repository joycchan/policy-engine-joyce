'use strict';

angular.module('policyEngine').controller('MainCtrl',
  function ($scope, $http) {
    var allocationId = 0;

    $scope.newAllocationId = function (type) {
      allocationId++;
      return allocationId.toString();
    };

    $scope.services = [];

    $scope.groups = [];

    $scope.allocations = [];

    $http.get('api/groups').success(function (data) {
      $scope.groups = data;
    });
  }
);