'use strict';

angular.module('policyEngine').controller('AssignmentCtrl',
  function ($scope, $state, PolicyStore, PolicyActions, $modal, Modals) {

    $scope.services = PolicyStore.Services.all.bind(PolicyStore.Services);

    $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);

    $scope.newAssignment = function () {
      $modal.open(Modals.newAssignment);
    };

    $scope.groupCentric = function () {
      return PolicyStore.Assignments.where({type: 'groupCentric'});
    };

    $scope.serviceCentric = function () {
      return PolicyStore.Assignments.where({type: 'serviceCentric'});
    };

    $scope.goToAssignment = function (assignment) {
      $state.go('main.assignment.' + assignment.type, {assignmentId: assignment.id});
    };

    $scope.listHeader = function (assignment) {
      if (assignment.type === 'groupCentric') {
        return 'Assigned Services';
      } else {
        return 'Assigned Groups';
      }
    };
  }
);
