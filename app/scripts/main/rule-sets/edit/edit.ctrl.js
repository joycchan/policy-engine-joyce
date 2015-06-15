angular.module('policyEngine').controller('RuleSetsEditCtrl',
  function($scope, $modal, $stateParams, ruleSets, Modals) {
    $scope.navTabLinks = [{
      'name': 'Settings',
      'uiSref': 'main.ruleSetsEdit.settings'
    }, {
      'name': 'Services',
      'uiSref': 'main.ruleSetsEdit.services'
    }];

    $scope.ruleSet = {};

    $scope.editRule = function () {
      // edit a copy of $scope.ruleSet(), so that the model will update only if we click "ok" in the modal
      var modalInstance = $modal.open(Modals.ruleSetEditor(angular.copy($scope.ruleSet)));

      modalInstance.result.then(function (updatedRuleSet) {
        ruleSets.update(updatedRuleSet);
      }, function () {
      });
    };

    $scope.$watchGroup(['$routeChangeSuccess', function() { return ruleSets.list(); }], function() {
      $scope.ruleSet = _.find(ruleSets.list(), function(rule) {
        return rule.id === $stateParams.ruleSetId;
      });
    });

  }
);
