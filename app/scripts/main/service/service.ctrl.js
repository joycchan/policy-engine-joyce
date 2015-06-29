'use strict';

angular.module('policyEngine').controller('ServiceCtrl',
  function ($scope, $state, PolicyStore, PolicyActions, $timeout) {


    $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);
    $scope.ruleSets = PolicyStore.RuleSets.all.bind(PolicyStore.RuleSets);
    $scope.categories = PolicyStore.Categories.all.bind(PolicyStore.Categories);

    $scope.service = {
      name: 'New Service',
      description: '',
      categoryId: '8' // uncategorized
    };

    $scope.selectedGroup = function() {
      return PolicyStore.Groups.find({id: $scope.service.providerGroupId});
    };

    $scope.selectedRuleSet = function() {
      return PolicyStore.RuleSets.find({id: $scope.service.ruleSetId});
    };

    $scope.createService = function() {
      if(!$scope.serviceIncomplete()) {
        PolicyActions.CreateService($scope.service);
        $state.go('main.services.filters.list');
      }
    };

    $scope.serviceIncomplete = function() {
      return !($scope.service.name && $scope.selectedGroup() && $scope.selectedRuleSet());
    };

    $scope.createGroup = function (group) {
      $scope.service.providerGroupId = group.id;
      $state.go('main.service.form');
    };

    $scope.createRuleSet = function(ruleSet) {
      $scope.service.ruleSetId = ruleSet.id;
      $state.go('main.service.form');
    };

    $scope.cancelGroup = function () {
      $state.go('main.service.form');
    };

    $scope.cancelRuleSet = function () {
      $state.go('main.service.form');
    };

  }
);
