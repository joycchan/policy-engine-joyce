angular.module('policyEngine').controller('ExistingRuleSetCtrl',
  function ($scope, PolicyStore, $state, $modal, Modals) {

    $scope.selected;

    $scope.selectRuleSet = function (selectedRuleSet) {
      $scope.selected = selectedRuleSet;
    };

    $scope.editRuleSet = function (ruleset) {
      $scope.selectRuleSet(ruleset);
      var modalInstance = $modal.open(Modals.ruleSetEditor([$scope.selected]));

      modalInstance.result.then(function () {
      }, function () {
      });
    }

    $scope.ruleSets = PolicyStore.RuleSets.all.bind(PolicyStore.RuleSets);

    $scope.ok = function () {
      $scope.service.ruleSet = $scope.selected;
      $state.go('main.service');
    };

    $scope.cancel = function () {
      $state.go('main.service');
    };

  });
