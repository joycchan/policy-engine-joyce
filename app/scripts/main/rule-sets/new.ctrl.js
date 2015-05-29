angular.module('policyEngine').controller('NewRuleSetCtrl', function ($scope, $modalInstance, ruleSets) {

  $scope.ruleSet = {
    name: "New Rule Set",
  };

  $scope.ok = function () {
    var ruleSet = ruleSets.create($scope.ruleSet);
    $modalInstance.close(ruleSet);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
