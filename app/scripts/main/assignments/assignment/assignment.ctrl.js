'use strict';

angular.module('policyEngine').controller('AssignmentCtrl',
  function($scope, $state, $stateParams, PolicyStore, PolicyActions) {

    $scope.services = PolicyStore.Services.all.bind(PolicyStore.Services);

    $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);

    $scope.$watch('$routeChangeSuccess', function() {
      if ($stateParams.assignmentId) {
        $scope.assignment = angular.copy(PolicyStore.Assignments.where({id: $stateParams.assignmentId})[0]);
      }
    });

    $scope.onDropComplete = function(data,evt) {
      $scope.assignment.collection.push(data.item);
    };

    $scope.saveAssignment = function() {
      PolicyActions.UpdateAssignment($scope.assignment);
      $state.go('main.assignments');
    };

  }
);
