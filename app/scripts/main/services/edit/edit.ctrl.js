'use strict';

angular.module('policyEngine').controller('ServicesEdit',
  function ($scope, PolicyStore, PolicyActions, $stateParams) {

    $scope.service = angular.copy(PolicyStore.Services.find({id: $stateParams.serviceId}));

    $scope.navTabLinks = [{
      'name': 'Provider Group',
      'uiSref': 'main.servicesEdit.providerGroup'
    }, {
      'name': 'Rule Set',
      'uiSref': 'main.servicesEdit.ruleSet'
    }, {
      'name': 'Assigned Groups',
      'uiSref': 'main.servicesEdit.assignedGroups'
    }];

    $scope.$watchGroup(['service.name', 'service.description'], function () {
      PolicyActions.UpdateService($scope.service);
    });

  });