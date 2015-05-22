'use strict';

angular.module('policyEngine').controller('ServicesCtrl',
    function($scope, $state) {

      $scope.assignService = function(service)  {
        var allocation = $scope.newAllocation('provide', service)
        $state.go('main.allocation.existing.provide', { allocationId: allocation.id });
      };

  }
);

