'use strict';

angular.module('policyEngine').controller('AssignmentCtrl',
  function($scope, $state, $stateParams, PolicyStore, PolicyActions) {

    $scope.services = PolicyStore.Services.all.bind(PolicyStore.Services);

    $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);

    $scope.$watch('$routeChangeSuccess', function() {
      console.log('assignments', PolicyStore.Assignments.all());
      console.log('stateParams', $stateParams);
      if ($stateParams.assignmentId) {
        console.log('search object', {id: $stateParams.assignmentId})
        console.log('PolicyStore.Assignments.where({id: $stateParams.assignmentId})', PolicyStore.Assignments.where({id: $stateParams.assignmentId}));
        $scope.assignment = angular.copy(PolicyStore.Assignments.where({id: $stateParams.assignmentId})[0]);
      }
      console.log('assignment', $scope.assignment);
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
