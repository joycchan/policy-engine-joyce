angular.module('policyEngine').controller('ExistingRuleSetCtrl',
  function ($scope, $modalInstance, ruleSets, $state, $modal, Modals) {

  $scope.selected;

  $scope.selectRuleSet = function (selectedRuleSet) {
    $scope.selected = selectedRuleSet;
    $state.go('.', {'ruleId': selectedRuleSet.id});
  };

  $scope.editRuleSet = function(ruleset) {
    $scope.selectRuleSet(ruleset);
    var modalInstance = $modal.open(Modals.rulesetEditor);

    modalInstance.result.then(function () {
    }, function () {
    });
  }

  $scope.ruleSets = ruleSets.list;

  $scope.ok = function () {
    $modalInstance.close($scope.selected);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});
