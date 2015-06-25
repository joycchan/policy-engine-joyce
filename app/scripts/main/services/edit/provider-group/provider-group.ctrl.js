'use strict';

angular.module('policyEngine').controller('ProviderGroupCtrl',
  function ($scope, $state, PolicyStore, PolicyActions) {

    $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);
    });