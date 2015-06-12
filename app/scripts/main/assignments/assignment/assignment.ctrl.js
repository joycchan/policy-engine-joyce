'use strict';

angular.module('policyEngine').controller('AssignmentCtrl',
  function($scope, $state, Groups, Services, $stateParams, assignments) {

    $scope.services = Services.list;

    $scope.groups = Groups.list;

    $scope.$state = $state;

    var assignmentIndex;

    $scope.assignment = function() {
      return assignments.list()[assignmentIndex];
    };

    $scope.$watch('$routeChangeSuccess', function() {
      if ($stateParams.assignmentId) {
        assignmentIndex = _.findIndex(assignments.list(), function (assignment) {
          return assignment.id === $stateParams.assignmentId;
        });
      }
      console.log('assignment', $scope.assignment());
    });

    $scope.onDropComplete = function(data,evt) {
      $scope.assignment().collection.push(data.item);
    };

    $scope.hideExit = function() {
      if ($scope.assignment()) {
        return $scope.assignment().collection.length === 0;
      }
    };

  }
);
