'use strict';

angular.module('policyEngine').controller('MainCtrl',
  function ($scope, $http, $state) {

    $scope.serviceState = function () {
      return $state.includes('main.service');
    };

    $scope.services = [];

    $scope.groups = [];

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

    var groupCentric = function () {
      return allocationsByType('consume');
    };

    var serviceCentric = function () {
      return allocationsByType('provide');
    };

    $scope.serviceConsumers = function (service) {
      var groups = [];

      var groupCentrics = _.filter(groupCentric(), function (allocation) {
        return _.find(allocation.collection, function (s) {
          return s.name === service.name;
        })
      });

      _.each(groupCentrics, function(allocation) {
        groups.push(allocation.item);
      });

      var serviceCentrics = _.filter(serviceCentric(), function(allocation) {
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
  }
);