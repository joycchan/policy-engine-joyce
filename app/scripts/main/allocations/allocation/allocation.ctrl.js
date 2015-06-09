'use strict';

angular.module('policyEngine').controller('AllocationCtrl',
  function($scope, $state, Groups) {

    $scope.maskGroups = function() {
      return $state.is('main.allocation.existing.consume');
    };

    $scope.maskServices = function () {
      return $state.is('main.allocation.existing.provide');
    };

    $scope.groups = Groups.list;

    $scope.$state = $state;

  }
);
