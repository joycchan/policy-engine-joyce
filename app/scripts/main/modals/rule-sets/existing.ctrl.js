angular.module('policyEngine').controller('ExistingRuleSetCtrl',
  function ($scope, $modalInstance, ruleSets, $state, $modal, Modals) {

  $scope.selected;

  $scope.selectRuleSet = function (selectedRuleSet) {
    $scope.selected = selectedRuleSet;
  };

  $scope.editRuleSet = function(ruleset) {
    $scope.selectRuleSet(ruleset);

    var _selected = {
      resolve: {
        selectedRuleset: function() {
          return $scope.selected;
        }
      }
    };
    var _modalConfig = _.extend(Modals.rulesetEditor, _selected);
    var modalInstance = $modal.open(_modalConfig);

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
