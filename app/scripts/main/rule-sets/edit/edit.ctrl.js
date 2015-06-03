angular.module('policyEngine').controller('RuleSetsEditCtrl',
  function($scope, $modal, $stateParams, ruleSets) {
    $scope.navTabLinks = [{
      'name': 'Settings',
      'uiSref': 'main.ruleSetsEdit.settings'
    }, {
      'name': 'Services',
      'uiSref': 'main.ruleSetsEdit.services'
    }];

    $scope.editRule = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'scripts/main/modals/rule-set-editor/rule-set-editor.html',
        windowTemplateUrl: 'scripts/templates/modal/window.html',
        controller: 'ExistingGroupCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function (selectedGroup) {
        $scope.service.group = selectedGroup;
      }, function () {
      });

    };

    $scope.rulesList = function() {
      return _.filter(ruleSets.list(), function(rule) {
        return rule.id == $stateParams.ruleId;
      });
    };

  }
);
