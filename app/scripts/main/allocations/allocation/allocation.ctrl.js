'use strict';

angular.module('policyEngine').controller('AllocationCtrl',
  function($scope, $state, $http) {

    $scope.maskGroups = function() {
      return $state.is('main.allocation.existing.consume');
    };

    $scope.maskServices = function () {
      return $state.is('main.allocation.existing.provide');
    };

    $scope.$state = $state;

  }
);
