angular.module('policyEngine').controller('RuleSetEditorCtrl',
  function ($scope, $modalInstance, $stateParams, selectedRuleSet, PolicyStore, StoreHelpers) {

    $scope.selectedRuleSet = selectedRuleSet; // local from resolve

    $scope.existingClassifiers = PolicyStore.Classifiers.all.bind(PolicyStore.Classifiers);

    $scope.existingActions = PolicyStore.Actions.all.bind(PolicyStore.Actions);

    $scope.search = {
      classifiers: {name:''},
      actions: {name:''}
    };

    $scope.ok = function () {
      if ($scope.areAllRulesValid()) {
        $modalInstance.close($scope.selectedRuleSet);
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

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    // WHY IS THIS HERE?
    window.scope = $scope;

    $scope.editModeHash = {
      // setting state for dev purposes
      0: true
    };

    $scope.isInEditModeForAnyRule = function () {
      return _.any($scope.editModeHash, function (index) {
        return index === true;
      });
    };

    // 'editor', 'classifier', 'action'
    $scope.innerModal = 'editor';

    $scope.toggleInnerModal = function(innerModal) {
      $scope.innerModal = innerModal;
    };

  });
