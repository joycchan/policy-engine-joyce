'use strict';

angular.module('policyEngine').controller('RuleSetsListCtrl',
  function($scope, $http) {

    $scope.rulesList = [];

    $http.get('api/ruleSets').success(function (data) {
      $scope.rulesList = data;
    });

  }
);
