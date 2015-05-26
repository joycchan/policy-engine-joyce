'use strict';

angular.module('policyEngine').controller('MainCtrl',
  function ($scope, $http, $state) {
    $scope.serviceState = function() {
      return $state.includes('main.service');
    };

    var allocationId = 0;

    $scope.newAllocation = function (type, item) {
      allocationId++;
      var allocation = {
        id: allocationId.toString(),
        type: type,
        item: item,
        collection: []
      };
      $scope.allocations.push(allocation);
      return allocation;
    };

    $scope.services = [];

    $scope.groups = [];

    $scope.allocations = [];

    $http.get('api/groups').success(function (data) {
      $scope.groups = data;
    });

    $http.get('api/services').success(function(data) {
      $scope.services = data;
    });
  }
);