'use strict';

angular.module('policyEngine').controller('ServicesEdit',
  function ($scope, PolicyStore, $stateParams) {
    $scope.service = function() {
      return _.find(PolicyStore.Services.all(), function(service) {
        return service.name === $stateParams.serviceId;
      });
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

    $scope.ruleSet = function() {
      // TODO: replace this punt.  This function only returns a rule.
    }

  });
