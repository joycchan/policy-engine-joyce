angular.module('policyEngine').controller('NewRuleSetCtrl', function ($scope, $state, ruleSets, $modal, Modals) {

  $scope.newRuleSets = [
    ruleSets.generateEmptyRuleSet()
  ];

  $scope.addRules = function () {
    $modal.open(Modals.rulesetEditor($scope.newRuleSets)); // pass scope.ruleSets into here
    
    modalInstance.result.then(function () {
      // when the modal closes, set the modified array of data to $scope.newRuleSets
    }, function () {
    });
  };

  $scope.disabled = function () {
    return ($scope.newRuleSets[0].classifiers.length === 0) || ($scope.newRuleSets[0].actions.length === 0);
  };


  // OK the rules in rulesets
    // make sure that the rule set has classifiers and actions in it
    // add it to rulesets service
    // return back to service view

  // CANCEL
    // return back to service view.
    // (reset the data? i think it should be deleted automatically)

  // $scope.ok = function () {
  //   if (!$scope.disabled()) {
  //     $scope.service.ruleSet = ruleSets.create($scope.ruleSet); // create an empty rule that is now modifiable via rule set editor
  //     $state.go('main.service');
  //   }
  // };

  // $scope.cancel = function () {
  //   $state.go('main.service');
  // };
});
