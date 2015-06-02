'use strict';

angular.module('policyEngine').controller('AccountCtrl',
  function($scope, configuration) {

    $scope.account = configuration.account;
  }
);
