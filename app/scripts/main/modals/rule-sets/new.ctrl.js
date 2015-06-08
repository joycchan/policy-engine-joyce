angular.module('policyEngine').controller('NewRuleSetCtrl', function ($scope, $state, ruleSets, $modal, Modals) {

  $scope.ruleSet = {
    name: "New Rule Set",
    classifiers: [],
    actions: [],
    custom: "Custom",
    id: Math.floor(Math.random() * 10000)
    // while the user is in main.ruleSetsEdit, the id allows the user to select a rule set out of the list to modify
    // logic in that state depends on $stateParams because it is not a modal w/ one parent controller
    // whereas in main.service, the data is on one controller which is the state of truth for the modals' data
    // TODO: remove client-side id generation
  };

  $scope.addRules = function () {
    $modal.open(Modals.rulesetEditor([$scope.ruleSet]));
  };

  $scope.disabled = function () {
    return ($scope.ruleSet.classifiers.length === 0) || ($scope.ruleSet.actions.length === 0);
  };

  $scope.ok = function () {
    if (!$scope.disabled()) {
      $scope.service.ruleSet = ruleSets.create($scope.ruleSet); // create an empty rule that is now modifiable via rule set editor
      $state.go('main.service');
    }
  };

  $scope.cancel = function () {
    $state.go('main.service');
  };
});
