'use strict';

angular.module('policyEngine').controller('ServicesEditRuleSet',
  function ($scope, PolicyStore, $modal, Modals) {
 
    $scope.ruleSet = function() {
      // TODO: currently searching rule sets via 'name', update this to search via id
      return _.first(PolicyStore.RuleSets.where({'name': $scope.service().ruleSet.name}));
    }

    $scope.editRule = function () {
      var modalInstance = $modal.open(Modals.ruleSetEditor(angular.copy($scope.ruleSet())));

      modalInstance.result.then(function (updatedRuleSet) {
        PolicyStore.RuleSets.update({id: updatedRuleSet.id}, updatedRuleSet)
      }, function () {
      });
    };

  });
