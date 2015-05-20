'use strict';

angular.module('policyEngine').controller('AllocationsCtrl',
  function($scope, $http, $state) {

    $scope.groups = [];

    $scope.maskGroups = function() {
      return $state.is('main.allocations.allocation.consume');
    };

    $scope.maskServices = function () {
      return $state.is('main.allocations.allocation.provide') ||
          $state.is('main.allocations.new');
    };

    $scope.$state = $state;

    $http.get('http://localhost:9000/api/services').success(function(data) {
      $scope.services = data;
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
