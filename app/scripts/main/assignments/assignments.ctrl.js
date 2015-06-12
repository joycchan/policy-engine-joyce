'use strict';

angular.module('policyEngine').controller('AssignmentsCtrl',
  function($scope, $state, PolicyStore) {

    $scope.assignments = PolicyStore.Assignments.all.bind(PolicyStore.Assignments);

    $scope.groupCentric = function () {
      return PolicyStore.Assignments.where({type: 'consume'});
    };

    $scope.serviceCentric = function () {
      return PolicyStore.Assignments.where({type: 'provide'});
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
