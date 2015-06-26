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
      controller: function($scope, PolicyStore, StoreHelpers) {

        $scope.getClassifiers = function(rule) {
          return StoreHelpers.getChildArray(rule, 'classifier');
        };

        $scope.getActions = function(rule) {
          return StoreHelpers.getChildArray(rule, 'action');
        };

      },
    };
  });
