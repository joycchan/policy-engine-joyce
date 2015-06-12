'use strict';

angular.module('policyEngine').controller('AssignmentCtrl',
  function($scope, $state, Groups, Services, $stateParams, assignments) {

    $scope.services = Services.list;

    $scope.groups = Groups.list;

    $scope.assignment;

    $scope.$watch('$routeChangeSuccess', function() {
      if ($stateParams.assignmentId) {
        $scope.assignment = angular.copy(assignments.read($stateParams.assignmentId));
      }
    });

    $scope.onDropComplete = function(data,evt) {
      $scope.assignment.collection.push(data.item);
    };

    $scope.saveAssignment = function() {
      assignments.update($stateParams.assignmentId, $scope.assignment);
      $state.go('main.assignments');
    };
  }
);
