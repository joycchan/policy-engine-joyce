angular.module('policyEngine').controller('RuleSetEditorCtrl', function ($scope, $modalInstance, ruleSets) {

  // $scope.selected;

  // $scope.selectRuleSet = function (selectedRuleSet) {
  //   $scope.selected = selectedRuleSet;
  // };

  $scope.ruleSets = ruleSets.list;

  $scope.ok = function () {
    $modalInstance.close($scope.selected);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
