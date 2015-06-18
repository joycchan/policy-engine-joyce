'use strict';

angular.module('policyEngine')
  .directive('detailedRulesList', function () {
    return {
      templateUrl: 'scripts/directives/detailed-rules-list/detailed-rules-list.html',
      scope: {
        ruleSet: '=',
        editRule: '='
      },
      restrict: 'E',
    };
  });
