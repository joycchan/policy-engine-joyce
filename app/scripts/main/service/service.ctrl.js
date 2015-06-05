'use strict';

angular.module('policyEngine').controller('ServiceCtrl',
  function ($scope, $state, $modal, Modals) {

    $scope.service = {
      name: 'New Service'
    };

    $scope.newGroup = function () {
      var modalInstance = $modal.open(Modals.newGroup);

      modalInstance.result.then(function (newGroup) {
        $scope.service.group = newGroup;
      }, function () {
      });

    };

    $scope.existingGroup = function () {
      var modalInstance = $modal.open(Modals.existingGroup);

      modalInstance.result.then(function (selectedGroup) {
        $scope.service.group = selectedGroup;
      }, function () {
      });

    };

    $scope.newRuleSet = function () {
      var modalInstance = $modal.open(Modals.newRuleset);

      modalInstance.result.then(function (newRuleSet) {
        $scope.service.ruleSet = newRuleSet;
        var modalInstance = $modal.open(Modals.rulesetEditor([$scope.service.ruleSet]));
        modalInstance.result.then(function () {}, function () {});

      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });

    };

    $scope.existingRuleSet = function () {
      var modalInstance = $modal.open(Modals.existingRuleset);

      modalInstance.result.then(function (selectedRuleSet) {
        $scope.service.ruleSet = selectedRuleSet;
      }, function () {
      });

    };

    $scope.createService = function() {
      $scope.services.push($scope.service);
      $state.go('main.services');
    };

    $scope.serviceIncomplete = function() {
      return !($scope.service.name && $scope.service.group && $scope.service.ruleSet);
    };
  }
);
