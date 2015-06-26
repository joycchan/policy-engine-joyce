angular.module('policyEngine').controller('RuleSetEditorCtrl',
  function ($scope, $modalInstance, $stateParams, selectedRuleSet, PolicyStore, PolicyActions) {

    $scope.selectedRuleSet = selectedRuleSet; // local from resolve

    $scope.existingClassifiers = PolicyStore.Classifiers.all.bind(PolicyStore.Classifiers);

    $scope.existingActions = PolicyStore.Actions.all.bind(PolicyStore.Actions);

    $scope.search = {
      classifiers: {name:''},
      actions: {name:''}
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
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
      $scope.customClassifier = emptyClassifier();
      $scope.customAction = emptyAction();
      $scope.innerModal = innerModal;
    };

    var emptyClassifier = function() {
      return {
        'name': 'New Custom Classifier',
        'custom': true
      }
    };

    $scope.customClassifier = emptyClassifier();

    $scope.createClassifier = function () {
      if ($scope.isCreateClassifierEnabled()) {
        PolicyActions.CreateClassifier($scope.customClassifier);
        $scope.toggleInnerModal('editor');
      }
    };

    $scope.isCreateClassifierEnabled = function() {
      return $scope.customClassifier.name && $scope.customClassifier.port && $scope.customClassifier.protocols;
    };

    var emptyAction = function() {
      return {
        'name': 'New Custom Action',
        data: [{
          "name": "nameA",
          "value": "valueA"
        }]
      }
    };

    $scope.customAction = emptyAction();

    $scope.createAction = function () {
      if ($scope.isCreateActionEnabled()) {
        PolicyActions.CreateAction($scope.customAction);
        $scope.toggleInnerModal('editor');
      }
    };

    $scope.isCreateActionEnabled = function() {
      return $scope.customAction.name && $scope.customAction.data;
    };

  });
