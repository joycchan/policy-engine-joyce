'use strict';

angular.module('policyEngine').controller('ServiceCtrl',
  function ($scope, $state, PolicyStore, PolicyActions) {


    $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);
    $scope.ruleSets = PolicyStore.RuleSets.all.bind(PolicyStore.RuleSets);

    $scope.selected;

    $scope.service = {
      name: 'New Service'
    };

    $scope.createService = function() {
      if(!$scope.serviceIncomplete()) {
        PolicyActions.CreateService($scope.service);
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

    $scope.selectGroup = function (selectedGroup) {
      $scope.selected = selectedGroup;
    };

  }
);
