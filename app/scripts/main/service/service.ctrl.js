'use strict';

angular.module('policyEngine').controller('ServiceCtrl',
  function ($scope, $state) {

    $scope.state = {
      groupChoice: 'new',
      ruleSetChoice: 'new'
    };

    $scope.groupName = "New Group";
    $scope.service = {};

    $scope.groupClass = function() {
      if ($scope.service.group) {
        return 'complete';
      } else if($state.includes('main.service.group')) {
        return 'current';
      }
    };

    $scope.ruleSetClass = function() {
      if ($scope.service.ruleSet) {
        return 'complete';
      } else if($state.includes('main.service.contract')) {
        return 'current';
      }
    };

    $scope.accessGroup = function () {
      $state.go('main.service.group.' + $scope.state.groupChoice);
    };

    $scope.accessRuleSet = function () {
      $state.go('main.service.contract.' + $scope.state.ruleSetChoice);
    };

    $scope.contractObj = [
      {name: "SQL Access", classifiers: "SQL-Port-1443", custom: "Default"},
      {name: "TrustSEC Access", classifiers: "TrustSEC SGACL", custom: "Default"},
      {name: "Overlay TEP", classifiers: "Overlay-TEP-Type-HWTEP", custom: "Default"},
      {name: "Overlay Encap", classifiers: "Overlay-Encap-Type-VXLAN", custom: "Default"},
      {name: "HTTP Access", classifiers: "TCP-80 Default", custom: "Default"},
    ];

    var setDefaultMetaData = function () {
      var group = ($scope.service.group && $scope.service.group.name) ? $scope.service.group.name : '';
      var ruleSet = ($scope.service.ruleSet && $scope.service.ruleSet.name) ? $scope.service.ruleSet.name : '';
      $scope.service.name = group + ':' + ruleSet;
    };

    $scope.selectRuleSet = function (selectedContract) {
      $scope.service.ruleSet = selectedContract;
      setDefaultMetaData();
    };
    $scope.selectGroup = function (selectedGroup) {
      $scope.service.group = selectedGroup;
      setDefaultMetaData();
    };

    $scope.createService = function () {
      $scope.services.push($scope.service);
      $state.go('main.services');
    };
  }
);
