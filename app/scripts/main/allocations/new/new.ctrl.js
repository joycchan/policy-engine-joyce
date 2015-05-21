'use strict';

angular.module('policyEngine').controller('AllocationNewCtrl',
  function ($scope, $state) {

    $scope.onDropComplete = function(data,evt){
      var allocation = {
        id: $scope.newAllocationId(),
        type: data.type,
        item: data.item,
        collection: []
      };
      $scope.allocations.push(allocation);

      if (data.type === 'service') {
        $state.go("main.allocation.existing.provide", { allocationId: allocation.id });
      } else if (data.type === 'group') {
        $state.go("main.allocation.existing.consume", { allocationId: allocation.id });
      } else {
        throw error;
      }
    }
  }
);
