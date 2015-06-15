'use strict';

angular.module('policyEngine').controller('ServiceCtrl',
  function ($scope, $state, Services) {

    $scope.service = {
      name: 'New Service'
    };

    $scope.createService = function() {
      if(!$scope.serviceIncomplete()) {
        Services.create($scope.service);
        $state.go('main.services.filters.list');
      }
    };

    $scope.serviceIncomplete = function() {
      return !($scope.service.name && $scope.service.group && $scope.service.ruleSet);
    };

    $scope.createGroup = function (group) {
      $scope.service.group = group;
      $state.go('main.service');
    };

    $scope.createRuleSet = function(ruleSet) {
      $scope.service.ruleSet = ruleSet;
      $state.go('main.service');
    };

    $scope.cancelGroup = function () {
      $state.go('main.service');
    };

    $scope.cancelRuleSet = function () {
      $state.go('main.service');
    };
  }
);
