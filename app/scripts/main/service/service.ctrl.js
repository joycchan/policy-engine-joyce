'use strict';

angular.module('policyEngine').controller('ServiceCtrl',
  function ($scope, $state, $modal, ruleSets) {

    $scope.service = {};

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

      modalInstance.result.then(function (newGroup) {
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

      modalInstance.result.then(function (newGroup) {
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });

    };

    $scope.ruleSetName = "New Rule Set";


    $scope.groupClass = function () {
      if ($scope.service.group) {
        return 'complete';
      } else if ($state.includes('main.service.group')) {
        return 'current';
      }
    };

    $scope.ruleSetClass = function () {
      if ($scope.service.ruleSet) {
        return 'complete';
      } else if ($state.includes('main.service.contract')) {
        return 'current';
      }
    };

    $scope.accessGroup = function () {
      $state.go('main.service.group.' + $scope.state.groupChoice);
      $scope.enabled = true;
    };

    $scope.accessRuleSet = function () {
      $state.go('main.service.contract.' + $scope.state.ruleSetChoice);
    };

    var setDefaultMetaData = function () {
      var group = ($scope.service.group && $scope.service.group.name) ? $scope.service.group.name : '';
      var ruleSet = ($scope.service.ruleSet && $scope.service.ruleSet.name) ? $scope.service.ruleSet.name : '';
      $scope.service.name = group + ':' + ruleSet;
    };

    $scope.ruleSets = ruleSets.list;

    $scope.selectRuleSet = function (selectedContract) {
      $scope.service.ruleSet = selectedContract;
      setDefaultMetaData();
    };

    $scope.createService = function () {
      $scope.services.push($scope.service);
      $state.go('main.services');
    };
  }
);
