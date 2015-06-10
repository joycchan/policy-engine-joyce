'use strict';

angular.module('policyEngine').controller('AssignmentNewCtrl',
  function ($scope, $state, assignments) {

    $scope.onDropComplete = function(data,evt){
      var assignment = assignments.create(data.type, data.item);

      if (data.type === 'provide') {
        $state.go("main.assignment.existing.provide", { assignmentId: assignment.id });
      } else if (data.type === 'consume') {
        $state.go("main.assignment.existing.consume", { assignmentId: assignment.id });
      } else {
        throw error;
      }
    }
  }
);
