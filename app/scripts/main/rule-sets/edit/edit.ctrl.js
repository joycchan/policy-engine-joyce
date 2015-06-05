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
      var _selected = {
        resolve: {
          selectedRuleset: function() {
            return $scope.rulesList;
          }
        }
      };

      var _modalConfig = _.extend(Modals.rulesetEditor, _selected);

      var modalInstance = $modal.open(_modalConfig);

      modalInstance.result.then(function () {
      }, function () {
      });
    };

  }
);
