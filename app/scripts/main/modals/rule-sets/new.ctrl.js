angular.module('policyEngine').controller('NewRuleSetCtrl', function ($scope, $modalInstance, ruleSets) {

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

  $scope.ok = function () {
    var ruleSet = ruleSets.create($scope.ruleSet); // create an empty rule that is now modifiable via rule set editor
    $modalInstance.close(ruleSet);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
