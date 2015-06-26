'use strict';

angular.module('policyEngine').controller('LoginCtrl',
  function ($scope, $state) {

    $scope.focused = {
      username: false,
      password: false
    };

    $scope.shiftFocus = function(target) {
      $scope.focused[target] = !$scope.focused[target];
    };

    $scope.login = function() {
      $state.go('main.services.filters.cards');
    };
  }
);
