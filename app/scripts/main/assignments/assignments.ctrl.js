'use strict';

angular.module('policyEngine').controller('AssignmentsCtrl',
  function($scope, $state, assignments) {

    $scope.assignments = assignments.list();

    $scope.groupCentric = function () {
      return assignments.byType('consume');
    };

    $scope.serviceCentric = function () {
      return assignments.byType('provide');
    };

    $scope.goToAssignment = function(assignment) {
      $state.go('main.assignment.existing.' + assignment.type, { assignmentId: assignment.id });
    };

    $scope.listHeader = function(assignment) {
      if (assignment.type === 'consume') {
        return 'Assigned Services';
      } else {
        return 'Assigned Groups';
      }
    };

    $scope.delete = function(assignment) {
      assignments.delete(assignment.id);
    };
  }
);
