angular.module('policyEngine').controller('ExistingRuleSetCtrl',
  function ($scope, ruleSets, $state, $modal, Modals) {

  $scope.selected;

  $scope.selectRuleSet = function (selectedRuleSet) {
    $scope.selected = selectedRuleSet;
  };

  $scope.editRuleSet = function(ruleset) {
    $scope.selectRuleSet(ruleset);
    var modalInstance = $modal.open(Modals.ruleSetEditor([$scope.selected]));

    modalInstance.result.then(function () {
    }, function () {
    });
  }

  $scope.ruleSets = ruleSets.list;

  $scope.ok = function () {
    $scope.service.ruleSet = $scope.selected;
    $state.go('main.service');
  };

  $scope.cancel = function () {
    $state.go('main.service');
  };

});
