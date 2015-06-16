'use strict';

angular.module('policyEngine')
  .directive('addEditRules', function () {
    return {
      templateUrl: 'scripts/directives/add-edit-rules/add-edit-rules.html',
      scope: {
        ruleSet: '=',
        editRule: '=',
      },
      restrict: 'E',
    };
  });
