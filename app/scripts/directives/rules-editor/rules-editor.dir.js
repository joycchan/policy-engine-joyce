'use strict';

angular.module('policyEngine')
  .directive('rulesEditor', function () {
    return {
      templateUrl: 'scripts/directives/rules-editor/rules-editor.html',
      controller: function ($scope) {

        var isExistingRuleSet = function (list, newItem) {
          return _.any(list, function (item) {
            return item.name === newItem;
          });
        }

        $scope.addClassifier = function (metaObject, index) {
          if (metaObject.type === 'classifier'
            && !isExistingRuleSet($scope.selectedRuleSet.rules[index].classifierIds, metaObject.data.name)
            && $scope.editModeHash[index]) {

            $scope.selectedRuleSet.rules[index].classifierIds.push(metaObject.data.id);
          }
        };

        $scope.addAction = function (metaObject, index) {
          if (metaObject.type === 'action'
            && !isExistingRuleSet($scope.selectedRuleSet.rules[index].actionIds, metaObject.data.name)
            && $scope.editModeHash[index]) {

            $scope.selectedRuleSet.rules[index].actionIds.push(metaObject.data.id);
          }
        };

        $scope.toggleEditRuleSet = function (index) {
          $scope.editModeHash[index] = !$scope.editModeHash[index];
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
            $scope.editModeHash[$scope.selectedRuleSet.rules.length - 1] = true;
          }
        };

        $scope.areAllRulesValid = function() {
          return _.all($scope.selectedRuleSet.rules, function(rule) {
            return doesRuleIncludeActionAndClassifier(rule);
          })
        }

        var doesRuleIncludeActionAndClassifier = function(rule) {
          return (rule.actionIds && rule.actionIds.length) && (rule.classifierIds && rule.classifierIds.length);
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
      scope: true,
      // scope: {
      //   classifier: '='
      // },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
