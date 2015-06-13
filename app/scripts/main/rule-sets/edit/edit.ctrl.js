angular.module('policyEngine').controller('RuleSetsEditCtrl',
  function($scope, $modal, $stateParams, PolicyStore, PolicyActions, Modals) {
    $scope.navTabLinks = [{
      'name': 'Settings',
      'uiSref': 'main.ruleSetsEdit.settings'
    }, {
      'name': 'Services',
      'uiSref': 'main.ruleSetsEdit.services'
    }];

    $scope.ruleSet = function() {
      return _.find(PolicyStore.RuleSets.all(), function(rule) {
        return rule.id === $stateParams.ruleId;
      });
    };

    $scope.editRule = function () {
      // edit a copy of $scope.ruleSet(), so that the model will update only if we click "ok" in the modal
      var modalInstance = $modal.open(Modals.ruleSetEditor(angular.copy($scope.ruleSet())));

      modalInstance.result.then(function (updatedRuleSet) {
        PolicyActions.UpdateRuleSet(updatedRuleSet);
      }, function () {
      });
    };

  }
);
