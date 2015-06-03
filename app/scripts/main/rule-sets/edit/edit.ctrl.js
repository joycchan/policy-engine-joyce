angular.module('policyEngine').controller('RuleSetsEditCtrl',
  function($scope, $modal, $stateParams, ruleSets, Modals) {
    $scope.navTabLinks = [{
      'name': 'Settings',
      'uiSref': 'main.ruleSetsEdit.settings'
    }, {
      'name': 'Services',
      'uiSref': 'main.ruleSetsEdit.services'
    }];

    $scope.editRule = function () {
      var modalInstance = $modal.open(Modals.rulesetEditor);

      modalInstance.result.then(function () {
      }, function () {
      });

    };

    $scope.rulesList = function() {
      return _.filter(ruleSets.list(), function(rule) {
        return rule.id == $stateParams.ruleId;
      });
    };

    // setTimeout(function() {
    //   $scope.editRule(); // setting state for dev purposes
    // }, 200)

  }
);
