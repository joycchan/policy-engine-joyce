'use strict';

angular.module('policyEngine').controller('RuleSetsCtrl',
  function ($scope, $modal, Modals, PolicyStore, PolicyActions) {

    $scope.rulesList = PolicyStore.RuleSets.all.bind(PolicyStore.RuleSets);

    $scope.deleteRuleSet = PolicyActions.DeleteRuleSet

    $scope.search = {name: ''};

    $scope.rulesListFilters = [
      {name: 'All Rule Sets'},
      {name: 'Default'},
      {name: 'Custom'}
    ];

    $scope.filter = "All Rule Sets";

    var byCustom = function (custom) {
      return _.filter(PolicyStore.RuleSets.all(), function (ruleSet) {
        if (custom === "") {
          return ruleSet;
        }
        else {
          return ruleSet.custom === custom;
        }
      });
    };


    $scope.filterRulesListBy = function (name) {
      $scope.filter = name;

      if (name === 'Default') {
        $scope.rulesList = function () {
          return byCustom('Default')
        };
      }
      else if (name === 'Custom') {
        $scope.rulesList = function () {
          return byCustom('Custom')
        };
      }
      else {
        $scope.rulesList = function () {
          return byCustom('')
        };
      }
    };

    $scope.isRulesListFilterSelected = function (name) {
      return name === $scope.filter;
    };

    $scope.newRuleSet = function () {
      var modalInstance = $modal.open(Modals.newRuleSet);

      modalInstance.result.then(function (newRule) {
      }, function () {
      });
    };

  }
);
