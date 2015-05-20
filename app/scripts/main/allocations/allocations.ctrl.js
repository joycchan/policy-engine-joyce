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

    $http.get('api/services').success(function(data) {
      $scope.services = data;
    });

    $http.get('api/groups').success(function(data) {
      $scope.groups = data;
    });

  }
);
