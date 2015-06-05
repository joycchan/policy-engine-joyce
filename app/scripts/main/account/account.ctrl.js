'use strict';

angular.module('policyEngine').controller('AccountCtrl',
  function ($scope, configuration) {

    $scope.account = configuration.account;

    $scope.isOvs = function() {
      return configuration.account.type === 'ovs';
    };

    $scope.isApic = function() {
      return configuration.account.type === 'apic';
    };
  }
);
