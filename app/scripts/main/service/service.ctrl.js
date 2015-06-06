'use strict';

angular.module('policyEngine').controller('ServiceCtrl',
  function ($scope, $state, $modal, Modals) {

    $scope.service = {
      name: 'New Service'
    };

    $scope.createService = function() {
      $scope.services.push($scope.service);
      $state.go('main.services.cards');
    };

    $scope.serviceIncomplete = function() {
      return !($scope.service.name && $scope.service.group && $scope.service.ruleSet);
    };
  }
);
