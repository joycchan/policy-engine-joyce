'use strict';

angular.module('policyEngine').controller('AllocationsCtrl',
  function($scope, $state) {

    $scope.goToAllocation = function(allocation) {
      $state.go('main.allocation.existing.' + allocation.type, { allocationId: allocation.id });
    };

    $scope.listHeader = function(allocation) {
      if (allocation.type === 'consume') {
        return 'Assigned Services';
      } else {
        return 'Assigned Groups';
      }
    }

    $scope.delete = function(allocation) {
      _.remove($scope.allocations, function(all) {
        return all.id === allocation.id;
      });
    }
  }
);
