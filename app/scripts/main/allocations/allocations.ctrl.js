'use strict';

angular.module('policyEngine').controller('AllocationsCtrl',
  function($scope, $http, $state) {

    $scope.group = {};
    $scope.servicesProvided = [];
    $scope.servicesConsumed = [];

    var uniqueItems = function(array, key) {
      return array ? _.unique(_.pluck(array, key)) : [];
    };

    $http.get('http://localhost:9000/api/group').success(function(data) {
      $scope.group = data;
    });

    $http.get('http://localhost:9000/api/services').success(function(data) {
      $scope.services = data;
      $scope.servicesProvided = uniqueItems($scope.group.servicesProvided, 'name');
      $scope.servicesConsumed = uniqueItems($scope.group.servicesConsumed, 'name');
    });

    $http.get('http://localhost:9000/api/groups').success(function(data) {
      $scope.groups = data;
    });

    $scope.onDragComplete=function(data,evt){
      console.log("drag success, data:", data);
    };

    $scope.onDropComplete = function(data,evt){
      $state.go("main.allocations.allocation.consume", { groupId: data.id });
      console.log("drop success, data:", data);
    }
  }
);
