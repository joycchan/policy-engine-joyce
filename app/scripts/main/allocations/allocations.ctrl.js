'use strict';

angular.module('policyEngine').controller('AllocationsCtrl',
  function($scope, $state, assignments) {

    $scope.assignments = assignments.list();

    $scope.groupCentric = function () {
      return assignments.byType('consume');
    };

    $scope.serviceCentric = function () {
      return assignments.byType('provide');
    };

    $scope.goToAllocation = function(allocation) {
      $state.go('main.allocation.existing.' + allocation.type, { allocationId: allocation.id });
    };

    $scope.listHeader = function(allocation) {
      if (allocation.type === 'consume') {
        return 'Assigned Services';
      } else {
        return 'Assigned Groups';
      }
    };

    $scope.delete = function(allocation) {
      assignments.delete(allocation.id);
    };
  }
);
