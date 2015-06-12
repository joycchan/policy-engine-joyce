'use strict';

angular.module('policyEngine').controller('AssignmentsCtrl',
  function($scope, $state, assignments, $modal, Modals) {

    $scope.assignments = assignments.list();

    $scope.newAssignment = function() {
      $modal.open(Modals.newAssignment);
    };

    $scope.groupCentric = function () {
      return assignments.byType('groupCentric');
    };

    $scope.serviceCentric = function () {
      return assignments.byType('serviceCentric');
    };

    $scope.goToAssignment = function(assignment) {
      $state.go('main.assignment.' + assignment.type, { assignmentId: assignment.id });
    };

    $scope.listHeader = function(assignment) {
      if (assignment.type === 'groupCentric') {
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
