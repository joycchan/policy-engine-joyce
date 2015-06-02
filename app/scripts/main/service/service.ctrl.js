'use strict';

angular.module('policyEngine').controller('ServiceCtrl',
  function ($scope, $state, $modal) {

    $scope.service = {
      name: 'New Service'
    };

    $scope.newGroup = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'scripts/main/groups/new.html',
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
        templateUrl: 'scripts/main/groups/existing.html',
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
        templateUrl: 'scripts/main/rule-sets/new.html',
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
        templateUrl: 'scripts/main/rule-sets/existing.html',
        controller: 'ExistingRuleSetCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function (selectedRuleSet) {
        $scope.service.ruleSet = selectedRuleSet;
      }, function () {
      });

    };

    $scope.selectGroup = function (selectedGroup) {
      $scope.service.group = selectedGroup;
      setDefaultMetaData();
    };

   $scope.toggleEnabled = function() {
       $scope.enabled = !$scope.enabled;
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
