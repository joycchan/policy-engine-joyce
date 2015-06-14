'use strict';

angular.module('policyEngine').controller('RuleSetsCtrl',
  function($scope, $modal, Modals, ruleSets) {

    $scope.rulesList = ruleSets.list;

    $scope.deleteRuleSet = ruleSets.delete;

    $scope.search = {name: ''};

    $scope.rulesListFilters = [
      {name: 'All Rule Sets'},
      {name: 'Default'},
      {name: 'Custom'}
    ];

    $scope.filter = "All Rule Sets";

    $scope.filterRulesListBy = function(name) {
      $scope.filter = name;

      if(name === 'Default')
      {
        $scope.rulesList = function() {return ruleSets.byCustom('Default')};
      }
      else if(name === 'Custom')
      {
        $scope.rulesList = function() {return ruleSets.byCustom('Custom')};
      }
      else {
        $scope.rulesList = function() {return ruleSets.byCustom('')};
      }
    };

    $scope.isRulesListFilterSelected = function(name) {
      return name === $scope.filter;
    };
  }
);
