'use strict';

angular.module('policyEngine').controller('AllocationsCtrl',
  function($scope, $http) {

    $scope.group = {};
    $scope.servicesProvided = [];
    $scope.servicesConsumed = [];

    var uniqueItems = function(array, key) {
      return array ? _.unique(_.pluck(array, key)) : [];
    };

    $http.get('http://localhost:9000/api/group').success(function(data) {
      $scope.group = data;
    });

    $http.get('http://localhost:9000/api/services').success(function(data) {
      $scope.services = data;
      $scope.servicesProvided = uniqueItems($scope.group.servicesProvided, 'name');
      $scope.servicesConsumed = uniqueItems($scope.group.servicesConsumed, 'name');
    });

    $http.get('http://localhost:9000/api/groups').success(function(data) {
      $scope.groups = data;
    });

  }
);
