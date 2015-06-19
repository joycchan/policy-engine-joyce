'use strict';

angular.module('policyEngine').controller('ServiceCtrl',
  function ($scope, $state, PolicyStore, PolicyActions) {


    $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);
    $scope.ruleSets = PolicyStore.RuleSets.all.bind(PolicyStore.RuleSets);

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
      $state.go('main.service.form');
    };

    $scope.createRuleSet = function(ruleSet) {
      $scope.service.ruleSet = ruleSet;
      console.log('created', $scope.service);
      $state.go('main.service.form');
    };

    $scope.cancelGroup = function () {
      $state.go('main.service.form');
    };

    $scope.cancelRuleSet = function () {
      $state.go('main.service.form');
    };

    $scope.importGroups = function(groups) {
      _.each(groups, function(group) {
        PolicyActions.ReceiveGroup(group);
      });
      $state.go('main.service.form');
    };

  }
);
