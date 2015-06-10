'use strict';

angular.module('policyEngine').controller('AssignmentExistingCtrl',
  function($scope, $stateParams, assignments) {

    var assignmentIndex;

    $scope.assignment = function() {
      return assignments.list()[assignmentIndex];
    };

    $scope.$watch('$routeChangeSuccess', function() {
      if ($stateParams.assignmentId) {
        assignmentIndex = _.findIndex(assignments.list(), function (assignment) {
          return assignment.id === $stateParams.assignmentId;
        });
      }
    });

    $scope.onDropComplete = function(data,evt) {
      $scope.assignment().collection.push(data.item);
    };

    $scope.hideExit = function() {
      return $scope.assignment().collection.length === 0;
    };

  }
);
