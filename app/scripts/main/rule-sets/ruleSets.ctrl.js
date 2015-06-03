'use strict';

angular.module('policyEngine').controller('RuleSetsCtrl',
  function($scope, ruleSets) {

    $scope.rulesList = ruleSets.list;

    $scope.search = {name: ''};

    $scope.rulesListFilters = [
      {name: 'All Rule Sets'},
      {name: 'Default'},
      {name: 'Custom'}
    ];

    $scope.filterRulesListBy = function(name) {};

    $scope.isRulesListFilterSelected = function(name) {
      return name === 'All Rule Sets' ? true : false;
    };


  }
);
