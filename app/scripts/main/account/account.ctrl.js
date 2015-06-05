'use strict';

angular.module('policyEngine').controller('AccountCtrl',
  function ($scope, configuration) {

    $scope.account = configuration.account;

    $scope.isOdl = function() {
      return configuration.account.type === 'odl';
    };

    $scope.isApic = function() {
      return configuration.account.type === 'apic';
    };
  }
);
