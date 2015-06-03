'use strict';

angular.module('policyEngine').controller('ServiceCtrl',
  function ($scope, $state, $modal) {

    $scope.service = {
      name: 'New Service'
    };

    $scope.newGroup = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'scripts/main/modals/groups/new.html',
        windowTemplateUrl: 'scripts/templates/modal/window.html',
        controller: 'NewGroupCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function (newGroup) {
        $scope.service.group = newGroup;
      }, function () {
      });

    };

    $scope.existingGroup = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'scripts/main/modals/groups/existing.html',
        windowTemplateUrl: 'scripts/templates/modal/window.html',
        controller: 'ExistingGroupCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function (selectedGroup) {
        $scope.service.group = selectedGroup;
      }, function () {
      });

    };

    $scope.newRuleSet = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'scripts/main/modals/rule-sets/new.html',
        windowTemplateUrl: 'scripts/templates/modal/window.html',
        controller: 'NewRuleSetCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function (newRuleSet) {
        $scope.service.ruleSet = newRuleSet;
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });

    };

    $scope.existingRuleSet = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'scripts/main/modals/rule-sets/existing.html',
        windowTemplateUrl: 'scripts/templates/modal/window.html',
        controller: 'ExistingRuleSetCtrl',
        size: 'lg'
      });

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
