'use strict';

angular.module('policyEngine').controller('AssignmentCtrl',
  function ($scope, $state, PolicyStore, PolicyActions, $modal, Modals, collapsed, StoreHelpers) {

    $scope.collapsedGroups = collapsed.groups;
    $scope.collapsedServices = collapsed.services;

    $scope.services = PolicyStore.Services.all.bind(PolicyStore.Services);

    $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);


  }
);
