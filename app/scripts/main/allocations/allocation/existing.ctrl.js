'use strict';

angular.module('policyEngine').controller('AllocationExistingCtrl',
  function($scope, $stateParams, assignments) {

    var allocationIndex;

    $scope.allocation = function() {
      return assignments.list[allocationIndex];
    };

    $scope.$watch('$routeChangeSuccess', function() {
      if ($stateParams.allocationId) {
        allocationIndex = _.findIndex(assignments.list, function (allocation) {
          return allocation.id === $stateParams.allocationId;
        });
      }
    });

    $scope.onDropComplete = function(data,evt) {
      $scope.allocation().collection.push(data.item);
    };

    $scope.hideExit = function() {
      return $scope.allocation().collection.length === 0;
    };

  }
);
