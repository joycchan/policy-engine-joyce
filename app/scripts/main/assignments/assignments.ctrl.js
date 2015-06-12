'use strict';

angular.module('policyEngine').controller('AssignmentsCtrl',
  function($scope, $state, PolicyStore, PolicyActions, $modal, Modals) {

    $scope.assignments = PolicyStore.Assignments.all.bind(PolicyStore.Assignments);

    $scope.newAssignment = function() {
      $modal.open(Modals.newAssignment);
    };

    $scope.groupCentric = function () {
      return PolicyStore.Assignments.where({type: 'groupCentric'});
    };

    $scope.serviceCentric = function () {
      return PolicyStore.Assignments.where({type: 'serviceCentric'});
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
      PolicyActions.DeleteAssignment(assignment.id);
    };
  }
);
