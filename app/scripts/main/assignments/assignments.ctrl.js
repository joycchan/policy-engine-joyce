'use strict';

angular.module('policyEngine').controller('AssignmentsCtrl',
  function ($scope, $state, PolicyStore, collapsed) {

    $scope.services = PolicyStore.Services.all.bind(PolicyStore.Services);

    $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);

    $scope.collapsedGroups = collapsed.groups;
    $scope.collapsedServices = collapsed.services;
  }
);
