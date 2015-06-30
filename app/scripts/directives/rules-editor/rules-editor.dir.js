'use strict';

angular.module('policyEngine')
  .directive('rulesEditor', function (StoreHelpers) {
    return {
      templateUrl: 'scripts/directives/rules-editor/rules-editor.html',
      controller: function ($scope) {

        $scope.getClassifiers = function(rule) {
          return StoreHelpers.getChildArray(rule, 'classifier');
        };

        $scope.getActions = function(rule) {
          return StoreHelpers.getChildArray(rule, 'action');
        };

        var isExistingRuleSet = function (list, newItemId) {
          return _.any(list, function (itemId) {
            return itemId === newItemId;
          });
        }

        $scope.addClassifier = function (metaObject, index) {
          if (metaObject.type === 'classifier'
            && !isExistingRuleSet($scope.selectedRuleSet.rules[index].classifierIds, metaObject.data.id)) {

            $scope.selectedRuleSet.rules[index].classifierIds.push(metaObject.data.id);
          }
        };

        $scope.addAction = function (metaObject, index) {
          if (metaObject.type === 'action'
            && !isExistingRuleSet($scope.selectedRuleSet.rules[index].actionIds, metaObject.data.id)) {
            $scope.selectedRuleSet.rules[index].actionIds.push(metaObject.data.id);
          }
        };

        var generateEmptyRule = function() {
          return {
            classifierIds: [],
            actionIds: []
          };
        };

        $scope.addRule = function() {
          if ($scope.areAllRulesValid()) {
            $scope.selectedRuleSet.rules.push(generateEmptyRule());
          }
        };

        $scope.deleteRule = function(index) {
          $scope.selectedRuleSet.rules.splice(index, 1);
        };

        $scope.deleteClassifier = function(rulesIndex, classifier) {
          _.remove($scope.selectedRuleSet.rules[rulesIndex].classifierIds, function(c) {
            return c === classifier.id;
          });
        };

        $scope.deleteAction = function(rulesIndex, action) {
          _.remove($scope.selectedRuleSet.rules[rulesIndex].actionIds, function(c) {
            return c === action.id;
          });
        };

      },
      // scope: true,
      scope: {
        areAllRulesValid: '=',
        selectedRuleSet: '='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
