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

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.getClassifiers = function(rule) {
      return StoreHelpers.getChildArray(rule, 'classifier');
    };

    $scope.getActions = function(rule) {
      return StoreHelpers.getChildArray(rule, 'action');
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

  });
