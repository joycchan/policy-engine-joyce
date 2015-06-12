'use strict';

angular.module('policyEngine').controller('AssignmentCtrl',
  function($scope, $state, $stateParams, PolicyStore) {

    $scope.services = PolicyStore.Services.all.bind(PolicyStore.Services);

    $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);

    $scope.$watch('$routeChangeSuccess', function() {
      if ($stateParams.assignmentId) {
        //$scope.assignment = angular.copy(assignments.read($stateParams.assignmentId));
      }
    });

    $scope.onDropComplete = function(data,evt) {
      $scope.assignment.collection.push(data.item);
    };

    $scope.saveAssignment = function() {
      //assignments.update($stateParams.assignmentId, $scope.assignment);
      $state.go('main.assignments');
    };
  }
);
