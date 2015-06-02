'use strict';

angular.module('policyEngine').controller('AllocationCtrl',
  function($scope, $state, groups) {

    $scope.maskGroups = function() {
      return $state.is('main.allocation.existing.consume');
    };

    $scope.maskServices = function () {
      return $state.is('main.allocation.existing.provide');
    };

    $scope.groups = groups.list;

    $scope.$state = $state;

  }
);
