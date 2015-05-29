'use strict';

angular.module('policyEngine').controller('RuleSetsListCtrl',
  function($scope, $http) {

    $scope.rulesList = [];

    $http.get('api/ruleSetsList').success(function (data) {
      console.log("data", data);
      $scope.rulesList = data;
    });

  }
);
