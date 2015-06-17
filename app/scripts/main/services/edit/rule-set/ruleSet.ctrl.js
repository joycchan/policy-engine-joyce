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
      // TODO: update this to search via id rather than name property
      $scope.ruleSet = angular.copy(_.first(PolicyStore.RuleSets.where({'name': $scope.service().ruleSet.name})));
    });

  });
