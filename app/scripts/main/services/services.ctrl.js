'use strict';

angular.module('policyEngine').controller('ServicesCtrl',
    function($scope, $state, assignments) {

      $scope.assignService = function(service)  {
        var allocation = assignments.create('provide', service)
        $state.go('main.allocation.existing.provide', { allocationId: allocation.id });
      };

  }
);

