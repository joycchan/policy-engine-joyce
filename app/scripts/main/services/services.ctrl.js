'use strict';

angular.module('policyEngine').controller('ServicesCtrl',
  function ($scope, $state, assignments) {

    $scope.categoriesState = function() {
      return $state.is('main.services.categories');
    };

    $scope.goToCategory = function(category) {
      $scope.addFilter('category', category);
      $state.go('main.services.cards');
    };

    $scope.assignService = function (service) {
      var allocation = assignments.create('provide', service)
      $state.go('main.allocation.existing.provide', {allocationId: allocation.id});
    };

    $scope.serviceConsumers = assignments.serviceConsumers;

    $scope.serviceConsumersString = function (service) {
      return _.pluck($scope.serviceConsumers(service), 'name').join(', ');
    };

    $scope.servicesByCategory = function(category) {
      return _.filter($scope.services, function(service) {
        return service.category.name == category.name;
      });
    };

    $scope.deleteCategory = function(category) {
      _.remove($scope.categories, function(c) {
        return c.name === category.name;
      });
    };

    $scope.deleteService = function(service) {
      _.remove($scope.services, function(s) {
        return s.name === service.name;
      });
      filterServices();
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

    $scope.providerGroups = [];
    $scope.ruleSets = [];
    $scope.categories = [
      {
        name: 'Backup and Storage',
        image: '../../../images/photo_backup.png'
      },
      {
        name: 'Business and Productivity Tools',
        image: '../../../images/photo_business.png'
      },
      {
        name: 'Database',
        image: '../../../images/photo_database.png'
      },
      {
        name: 'Email',
        image: '../../../images/photo_email.png'
      },
      {
        name: 'Internet Security',
        image: '../../../images/photo_internet.png'
      },
      {
        name: 'Software Updates',
        image: '../../../images/photo_software.png'
      },
      {
        name: 'Voice & Video',
        image: '../../../images/photo_voice.png'
      }
    ];

    $scope.$watch('services', function () {
      $scope.providerGroups = _.uniq(_.map($scope.services, function (service) {
        return service.group
      }), 'name');
      $scope.ruleSets = _.uniq(_.map($scope.services, function (service) {
        return service.ruleSet
      }), 'name');
      $scope.filteredServices = $scope.services;
    });


    $scope.selectedCheckBoxes = {};

    $scope.isRowInListSelected = function (id) {
      return $scope.selectedCheckBoxes[id] === true;
    }

  }
);

