angular.module('policyEngine').controller('RuleSetEditorCtrl',
  function ($scope, $modalInstance, $stateParams, selectedRuleSet, PolicyStore, PolicyActions) {

    $scope.selectedRuleSet = selectedRuleSet; // local from resolve

    $scope.existingClassifiers = PolicyStore.Classifiers.all.bind(PolicyStore.Classifiers);

    $scope.existingActions = PolicyStore.Actions.all.bind(PolicyStore.Actions);

    $scope.search = {
      classifiers: {name:''},
      actions: {name:''}
    };

    $scope.editModeHash = {};

    $scope.CONSTANTS = {
      'EDITOR': 'editor',
      'CLASSIFIER': 'classifier',
      'ACTION': 'action'
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
      return (rule.actionIds && rule.actionIds.length)
        && (rule.classifierIds && rule.classifierIds.length);
    };



    $scope.innerModal = 'editor'; // modals can be 'editor', 'classifier', 'action'

    $scope.toggleInnerModal = function(innerModal) {
      // clear the customClassifier + customAction models of any previous state
      $scope.customClassifier = emptyClassifier();
      $scope.customAction = emptyAction();
      // show inner modal
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
        $scope.toggleInnerModal($scope.CONSTANTS.EDITOR);
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
        $scope.toggleInnerModal($scope.CONSTANTS.EDITOR);
      }
    };

    $scope.isCreateActionEnabled = function() {
      return $scope.customAction.name && $scope.customAction.data;
    };

  });
