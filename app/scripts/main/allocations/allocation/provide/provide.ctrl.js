'use strict';

angular.module('policyEngine').controller('ProvideCtrl',
  function ($scope) {
    $scope.onDropComplete = function(data,evt) {
      $scope.group.provided.push(data);
    }
  }
);
