'use strict';

angular.module('policyEngine').controller('AllocationNewCtrl',
  function ($scope, $state) {

    $scope.onDropComplete = function(data,evt){
      var allocation = $scope.newAllocation(data.type, data.item);

      if (data.type === 'provide') {
        $state.go("main.allocation.existing.provide", { allocationId: allocation.id });
      } else if (data.type === 'consume') {
        $state.go("main.allocation.existing.consume", { allocationId: allocation.id });
      } else {
        throw error;
      }
    }
  }
);
