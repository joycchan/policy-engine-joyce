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
      // we should get a copy of $scope.rulesList()
      // edit that in the modal
      var modalInstance = $modal.open(Modals.rulesetEditor($scope.rulesList()));

      modalInstance.result.then(function () {
        // when we return from the modal,
        // search through the rules list,
        // use the service to edit it
      }, function () {
      });
    };

  }
);
