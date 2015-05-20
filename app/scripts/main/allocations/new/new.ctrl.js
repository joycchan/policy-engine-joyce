'use strict';

angular.module('policyEngine').controller('AllocationNewCtrl',
  function ($scope, $state) {

    $scope.onDropComplete = function(data,evt){
      $state.go("main.allocations.allocation.consume", { groupId: data.id });
    }
  }
);
