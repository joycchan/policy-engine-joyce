'use strict';

angular.module('policyEngine').controller('ServiceCtrl',
  function ($scope, $state, PolicyStore) {

    $scope.service = {
      name: 'New Service'
    };

    $scope.createService = function() {
      if(!$scope.serviceIncomplete()) {
        PolicyStore.Actions.CreateService($scope.service);
        $state.go('main.services.filters.list');
      }
    };

    $scope.serviceIncomplete = function() {
      return !($scope.service.name && $scope.service.group && $scope.service.ruleSet);
    };
  }
);
