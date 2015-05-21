'use strict';

angular.module('policyEngine').controller('AllocationExistingCtrl',
  function($scope, $stateParams) {

    var allocationId;

    $scope.allocation = function() {
      return $scope.allocations[allocationId];
    };

    $scope.$watch('$routeChangeSuccess', function() {
      if ($stateParams.allocationId) {
        allocationId = _.findIndex($scope.allocations, function (allocation) {
          return allocation.id === $stateParams.allocationId;
        });
      }
    });

    $scope.onDropComplete = function(data,evt) {
      $scope.allocation().collection.push(data.itemt stat);
    }
  }
);
