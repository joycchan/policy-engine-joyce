angular.module('policyEngine').controller('RuleSetEditorCtrl',
  function ($scope, $modalInstance, $stateParams, selectedRuleSet, PolicyStore, StoreHelpers) {

    $scope.selectedRuleSet = selectedRuleSet; // local from resolve

    $scope.existingClassifiers = PolicyStore.Classifiers.all.bind(PolicyStore.Classifiers);

    $scope.existingActions = PolicyStore.Actions.all.bind(PolicyStore.Actions);

    $scope.ok = function () {
      if ($scope.areAllRulesValid()) {
        $modalInstance.close($scope.selectedRuleSet);
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    var isExistingRuleSet = function (list, newItem) {
      return _.any(list, function (item) {
        return item.name === newItem;
      });
    }

    $scope.getClassifiers = function(rule) {
      return StoreHelpers.getChildArray(rule, 'classifier');
    };

    $scope.getActions = function(rule) {
      return StoreHelpers.getChildArray(rule, 'action');
    };

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

    $scope.editModeHash = {
      // setting state for dev purposes
      0: true
      // ,
    };

    $scope.toggleEditRuleSet = function (index) {
      $scope.editModeHash[index] = !$scope.editModeHash[index];
    };

    $scope.isInEditModeForAnyRule = function () {
      return _.any($scope.editModeHash, function (index) {
        return index === true;
      });
    };

    $scope.search = {
      classifiers: {name:''},
      actions: {name:''}
    };

    var generateEmptyRule = function() {
      return {
        classifierIds: [],
        actionIds: []
      };
    };

    window.scope = $scope;

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

    // to do
    // allow user to delete rule, upon hover of table row + click on X
    // allow user to add new rule, upon hover of bottom of table + click
    // allow user to delte individual classifiers and actions

    $scope.deleteRule = function(index) {
      $scope.selectedRuleSet.rules.splice(index, 1);
    };

    $scope.deleteClassifier = function(rulesIndex, classifier) {
      _.remove($scope.selectedRuleSet.rules[rulesIndex].classifiers, function(c) {
        return c.name === classifier.name;
      });
    };
    $scope.deleteAction = function(rulesIndex, action) {
      _.remove($scope.selectedRuleSet.rules[rulesIndex].actions, function(c) {
        return c.name === action.name;
      });
    }

  });
