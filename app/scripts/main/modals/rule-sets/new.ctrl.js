angular.module('policyEngine').controller('NewRuleSetCtrl', function ($scope, $state, ruleSets, $modal, Modals) {

  $scope.newRuleSet = ruleSets.generateEmptyRuleSet();

  $scope.addRules = function () {
    var modalInstance = $modal.open(Modals.ruleSetEditor(angular.copy($scope.newRuleSet)));
    
    modalInstance.result.then(function (updatedRuleSet) {
      $scope.newRuleSet = updatedRuleSet;
    }, function () {
    });
  };

  $scope.disabled = function () {
    return ($scope.newRuleSet.rules[0].classifiers.length === 0 || $scope.newRuleSet.rules[0].actions.length === 0);
  };

  $scope.ok = function () {
    if (!$scope.disabled()) {
      $scope.service.ruleSet = ruleSets.create($scope.newRuleSet); 
      $state.go('main.service');
    }
  };

  $scope.cancel = function () {
    $state.go('main.service');
  };
});
