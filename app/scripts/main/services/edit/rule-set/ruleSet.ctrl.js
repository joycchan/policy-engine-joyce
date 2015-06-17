'use strict';

angular.module('policyEngine').controller('ServicesEditRuleSet',
  function ($scope, PolicyStore, PolicyActions, $modal, Modals) {

    $scope.ruleSet = angular.copy(_.first(PolicyStore.RuleSets.where({'name': $scope.service().ruleSet.name})));

    $scope.editRule = function () {
      var modalInstance = $modal.open(Modals.ruleSetEditor($scope.ruleSet));

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

  });
