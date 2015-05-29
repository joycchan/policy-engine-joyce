angular.module('policyEngine').controller('NewRuleSetCtrl', function ($scope, $modalInstance, ruleSets) {

  $scope.ruleSet = {
    name: "New Rule Set",
  };

  $scope.ok = function () {
    ruleSets.create($scope.ruleSet);
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
