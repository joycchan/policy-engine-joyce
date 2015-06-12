'use strict';

angular.module('policyEngine').controller('AssignmentCtrl',
  function($scope, $state, PolicyStore) {

    $scope.services = PolicyStore.Services.all.bind(PolicyStore.Services);

    $scope.maskGroups = function() {
      return $state.is('main.assignment.existing.consume');
    };

    $scope.maskServices = function () {
      return $state.is('main.assignment.existing.provide');
    };

    $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);

    $scope.$state = $state;

  }
);
