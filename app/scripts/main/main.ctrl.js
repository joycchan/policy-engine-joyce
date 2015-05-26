'use strict';

angular.module('policyEngine').controller('MainCtrl',
  function ($scope, $http, $state) {

    $scope.serviceState = function() {
      return $state.includes('main.service');
    };

    $scope.services = [];

    $scope.groups = [];

    //scope.allocations = [{"id":"1","type":"consume","item":{"id":"1","name":"All Employees","description":"ISE (Active Directory)","provided":[],"consumed":[],"$$hashKey":"object:9"},"collection":[{"name":"SQL External Access","group":{"name":"Database Group"},"ruleSet":{"name":"Canned Contract"},"$$hashKey":"object:21"},{"name":"SQL Basic Access","group":{"name":"Database Group"},"ruleSet":{"name":"Canned Contract"},"$$hashKey":"object:19"},{"name":"SQL VIP Access","group":{"name":"Database Group"},"ruleSet":{"name":"Canned Contract"},"$$hashKey":"object:20"}],"$$hashKey":"object:29"}];
    $scope.allocations = [];

    var allocationId = $scope.allocations.length;

    $scope.newAllocation = function (type, item) {
      allocationId++;
      var allocation = {
        id: allocationId.toString(),
        type: type,
        item: item,
        collection: []
      };
      $scope.allocations.push(allocation);
      return allocation;
    };

    $http.get('api/groups').success(function (data) {
      $scope.groups = data;
    });

    $http.get('api/services').success(function(data) {
      $scope.services = data;
    });
  }
);