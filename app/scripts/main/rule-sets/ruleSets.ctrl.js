'use strict';

angular.module('policyEngine').controller('RuleSetsCtrl',
  function ($scope, $modal, Modals, PolicyStore, PolicyActions, $state) {

    $scope.deleteRuleSet = PolicyActions.DeleteRuleSet

    $scope.search = {name: ''};

    $scope.rulesListFilters = [
      {name: 'All Rule Sets', filterFunction: function(ruleSet) { return true; } },
      {name: 'Default', filterFunction: function(ruleSet) { return !ruleSet.custom; }},
      {name: 'Custom', filterFunction: function(ruleSet) { return ruleSet.custom; } }
    ];

    $scope.filterRulesList = function (filterName) {
      $scope.filterName = filterName;
    };

    $scope.filterRulesList($scope.rulesListFilters[0].name);

    $scope.rulesList = function() {
      var filter = _.find($scope.rulesListFilters, function(filter) { return filter.name === $scope.filterName; });
      return _.filter(PolicyStore.RuleSets.all(), filter.filterFunction);
    };

    $scope.isRulesListFilterSelected = function (filterName) {
      return filterName === $scope.filterName;
    };

    $scope.newRuleSet = function() {
      var modalInstance = $modal.open(Modals.newRuleSet);

      modalInstance.result.then(function (newRule) {
      }, function () {
      });
    };


    $scope.edit = function(rule) {
      return $state.go('main.ruleSetsEdit', { ruleSetId: rule.id });
    };

  }
);
