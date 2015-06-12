'use strict';

angular.module('policyEngine').controller('AssignmentsCtrl',
  function($scope, $state, assignments, $modal, Modals) {

    $scope.assignments = assignments.list();

    $scope.newAssignment = function() {
      console.log('modals', Modals.newAssignment)
      $modal.open(Modals.newAssignment);
    };

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
