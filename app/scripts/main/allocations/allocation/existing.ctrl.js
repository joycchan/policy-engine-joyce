'use strict';

angular.module('policyEngine').controller('AllocationExistingCtrl',
  function($scope, $stateParams) {

    var allocationIndex;

    $scope.allocation = function() {
      return $scope.allocations[allocationIndex];
    };

    $scope.$watch('$routeChangeSuccess', function() {
      if ($stateParams.allocationId) {
        allocationIndex = _.findIndex($scope.allocations, function (allocation) {
          return allocation.id === $stateParams.allocationId;
        });
      }
    });

    $scope.onDropComplete = function(data,evt) {
      $scope.allocation().collection.push(data.item);
    }

    $scope.hideExit = function() {
      return $scope.allocation().collection.length === 0;
    };

  }
);
