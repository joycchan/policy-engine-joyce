'use strict';

angular.module('policyEngine').controller('ServicesCtrl',
  function ($scope, $state, assignments) {

    $scope.assignService = function (service) {
      var allocation = assignments.create('provide', service)
      $state.go('main.allocation.existing.provide', {allocationId: allocation.id});
    };

    $scope.serviceConsumers = assignments.serviceConsumers;

    $scope.serviceConsumersString = function (service) {
      return _.pluck($scope.serviceConsumers(service), 'name').join(', ');
    };

    $scope.filteredServices = [];

    $scope.filters = {};

    var filterServices = function () {
      $scope.filteredServices = $scope.services;
      _.each(['category', 'group', 'ruleSet'], function (type) {
        if ($scope.filters[type]) {
          $scope.filteredServices = _.filter($scope.filteredServices, function (service) {
            return service[type].name === $scope.filters[type].name;
          });
        }
      });
    };

    $scope.addFilter = function (filter, value) {
      $scope.filters[filter] = value;
      filterServices();
    };

    $scope.removeFilter = function (filter) {
      delete $scope.filters[filter];
      filterServices();
    };

    $scope.categories = [];
    $scope.providerGroups = [];
    $scope.ruleSets = [];

    $scope.$watch('services', function () {
      $scope.providerGroups = _.uniq(_.map($scope.services, function (service) {
        return service.group
      }), 'name');
      $scope.ruleSets = _.uniq(_.map($scope.services, function (service) {
        return service.ruleSet
      }), 'name');
      $scope.categories = _.uniq(_.map($scope.services, function (service) {
        return service.category
      }), 'name');
      $scope.filteredServices = $scope.services;
    });


    $scope.selectedCheckBoxes = {};

    $scope.isRowInListSelected = function (id) {
      return $scope.selectedCheckBoxes[id] === true;
    }

  }
);

