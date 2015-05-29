'use strict';

angular.module('policyEngine').controller('MainCtrl',
  function ($scope, $http, $state, assignments) {

    $scope.serviceState = function () {
      return $state.includes('main.service');
    };

    $scope.services = [];


    $http.get('api/services').success(function (data) {
      $scope.services = data;
    });

    $scope.search = '';
  }
);
