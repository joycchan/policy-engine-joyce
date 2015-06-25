'use strict';

angular.module('policyEngine').controller('ServicesEditRuleSet',
  function ($scope, PolicyStore, PolicyActions, $modal, Modals) {

    $scope.editRule = function () {
      var modalInstance = $modal.open(Modals.ruleSetEditor(angular.copy($scope.ruleSet)));

      modalInstance.result.then(function (updatedRuleSet) {
        PolicyActions.UpdateRuleSet(updatedRuleSet);
      }, function () {
      });
    };

    $scope.selectExistingRuleSet = function () {
      var modalInstance = $modal.open(Modals.existingRuleset);

      modalInstance.result.then(function (updatedRuleSet) {
        // update service to use this updatedRuleSet
      }, function () {
      });
    };

    $scope.$watchGroup(['$routeChangeSuccess', function () {
      return PolicyStore.RuleSets.all();
    }], function () {
      $scope.ruleSet = angular.copy(PolicyStore.RuleSets.find({id: $scope.service.ruleSetId}));
    });

  });
