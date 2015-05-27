'use strict';

angular.module('policyEngine').controller('MainCtrl',
  function ($scope, $http, $state) {

    $scope.serviceState = function () {
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

    var allocationsByType = function (type) {
      return _.filter($scope.allocations, function (allocation) {
        return allocation.type === type;
      });
    };

    $scope.groupCentric = function () {
      return allocationsByType('consume');
    };

    $scope.serviceCentric = function () {
      return allocationsByType('provide');
    };

    $scope.serviceConsumers = function (service) {
      var groups = [];

      var groupCentrics = _.filter($scope.groupCentric(), function (allocation) {
        return _.find(allocation.collection, function (s) {
          return s.name === service.name;
        })
      });

      _.each(groupCentrics, function(allocation) {
        groups.push(allocation.item);
      });

      var serviceCentrics = _.filter($scope.serviceCentric(), function(allocation) {
        return allocation.item.name === service.name;
      });

      _.each(serviceCentrics, function(allocation) {
        groups = groups.concat(allocation.collection);
      });

      return groups;
    };

    $http.get('api/groups').success(function (data) {
      $scope.groups = data;
    });

    $http.get('api/services').success(function (data) {
      $scope.services = data;
    });

    $scope.search = '';
  }
);
