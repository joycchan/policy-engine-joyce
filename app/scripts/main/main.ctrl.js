'use strict';

angular.module('policyEngine').controller('MainCtrl',
  function ($scope, $http, $state, assignments) {

    $scope.serviceState = function () {
      return $state.includes('main.service');
    };

    $scope.services = [];

    $scope.groups = [];

    $http.get('api/groups').success(function (data) {
      $scope.groups = data;
    });

    $http.get('api/services').success(function (data) {
      $scope.services = data;
    });
  }
);