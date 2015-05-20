'use strict';

angular.module('policyEngine').controller('ConsumeCtrl',
  function ($scope) {

    $scope.onDropComplete = function(data,evt) {
      $scope.group.consumed.push(data);
    }
  }
);
