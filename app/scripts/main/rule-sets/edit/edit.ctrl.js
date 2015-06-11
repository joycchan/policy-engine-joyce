angular.module('policyEngine').controller('RuleSetsEditCtrl',
  function($scope, $modal, $stateParams, ruleSets, Modals) {
    $scope.navTabLinks = [{
      'name': 'Settings',
      'uiSref': 'main.ruleSetsEdit.settings'
    }, {
      'name': 'Services',
      'uiSref': 'main.ruleSetsEdit.services'
    }];

    $scope.rulesList = function() {
      return _.filter(ruleSets.list(), function(rule) {
        return rule.id == $stateParams.ruleId;
      });
    };

    $scope.editRule = function () {
      var modalInstance = $modal.open(Modals.rulesetEditor($scope.rulesList()));

      modalInstance.result.then(function () {
      }, function () {
      });
    };

    $scope.rulesets =
    {
      name: ruleSets.getEdit().name,
      description: ruleSets.getEdit().description
    }

    $scope.open = function (editRule) {

      var modalInstance = $modal.open(Modals.editRule(editRule));

      modalInstance.result.then(function (editRule) {
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });

    };

  }
);
