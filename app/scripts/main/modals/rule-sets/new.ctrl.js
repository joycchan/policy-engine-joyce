angular.module('policyEngine').controller('NewRuleSetCtrl', function ($scope, $state, PolicyActions, $modal, Modals) {

  var generateEmptyRuleSet = function () {
    return {
      name: "New Rule Set",
      description: '',
      custom: true,
      rules: [{
        classifiers: [],
        actions: [],
      }],
      id: (Math.floor(Math.random() * 10000)).toString()
      // while the user is in main.ruleSetsEdit, the id allows the user to select a rule set out of the list to modify
      // logic in that state depends on $stateParams because it is not a modal w/ one parent controller
      // whereas in main.service, the data is on one controller which is the state of truth for the modals' data
      // TODO: remove client-side id generation
    };
  };

  $scope.newRuleSet = generateEmptyRuleSet();

  $scope.editRule = function () {
    var modalInstance = $modal.open(Modals.ruleSetEditor(angular.copy($scope.newRuleSet)));

    modalInstance.result.then(function (updatedRuleSet) {
      $scope.newRuleSet = updatedRuleSet;
    }, function () {
    });
  };

  $scope.disabled = function () {
    return ($scope.newRuleSet.rules[0].classifiers.length === 0 || $scope.newRuleSet.rules[0].actions.length === 0);
  };

  $scope.create = function () {
    if (!$scope.disabled()) {
      var ruleSet = PolicyActions.CreateRuleSet($scope.newRuleSet); // $scope.service is in the parent controller
      $scope.createRuleSet(ruleSet);
    }
  };

});
