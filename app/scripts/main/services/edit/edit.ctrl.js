'use strict';

angular.module('policyEngine').controller('ServicesEdit',
  function ($scope, PolicyStore, PolicyActions, $stateParams, $state) {

    $scope.service = angular.copy(PolicyStore.Services.find({id: $stateParams.serviceId}));

    $scope.providerGroup = function() {
      return PolicyStore.Groups.find({id: $scope.service.providerGroupId});
    };

    $scope.editProviderGroup = function() {
      $state.go('main.groupsEdit.settings', { groupId: $scope.providerGroup().id });
    };

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
