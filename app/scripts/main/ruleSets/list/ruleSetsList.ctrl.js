'use strict';

angular.module('policyEngine').controller('RuleSetsListCtrl',
  function($scope, ruleSets) {

    $scope.rulesList = ruleSets.list;

  }
);
