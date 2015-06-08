'use strict';

angular.module('policyEngine').controller('RuleSetsCtrl',
  function($scope, $modal, Modals, ruleSets) {

    $scope.rulesList = ruleSets.list;

    $scope.search = {name: ''};

    $scope.rulesListFilters = [
      {name: 'All Rule Sets'},
      {name: 'Default'},
      {name: 'Custom'}
    ];

    $scope.filterRulesListBy = function(name) {
      if(name === 'Default')
      {
        $scope.rulesList = ruleSets.byCustom('Default');
      }
      else if(name === 'Custom')
      {
        $scope.rulesList = ruleSets.byCustom('Custom');
      }
      else {
        $scope.rulesList = ruleSets.byCustom('');
      }
    };

    $scope.isRulesListFilterSelected = function(name) {
      return name === 'All Rule Sets' ? true : false;
    };

    $scope.newRuleset = function() {
      var modalInstance = $modal.open(Modals.newRuleset);

      modalInstance.result.then(function (newRule) {
      }, function () {
      });
    };


  }
);
