'use strict';

angular.module('policyEngine').controller('ServicesCtrl',
  function ($scope, $state, assignments, Services) {

    $scope.filtered = {
      category: false,
      group: false,
      ruleSet: false
    };

    $scope.categoryState = function() {
      return !$scope.filtered['category'] && !$state.is('main.services.filters.list');
    };

    $scope.cardsState = function() {
      return $state.is('main.services.filters.cards');
    };

    $scope.goToCategoryState = function() {
      $state.go('main.services.filters.cards', { category: undefined, group: undefined, ruleSet: undefined });
    };

    $scope.addFilter = function (type, object) {
      var params = {};
      params[type] = object.name;
      $state.go('.', params);
    };

    $scope.removeFilter = function(type) {
      var params = {};
      params[type] = undefined;
      $state.go('.', params);
    };

    $scope.assignService = function (service) {
      var allocation = assignments.create('provide', service)
      $state.go('main.allocation.existing.provide', {allocationId: allocation.id});
    };

    $scope.serviceConsumers = assignments.serviceConsumers;

    $scope.serviceConsumersString = function (service) {
      return _.pluck($scope.serviceConsumers(service), 'name').join(', ');
    };

    $scope.servicesByCategory = Services.byCategory;

    $scope.deleteCategory = function(category) {
      _.remove($scope.categories, function(c) {
        return c.name === category.name;
      });
    };

    $scope.deleteService = Services.delete;

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

    $scope.selectedCheckBoxes = {};

    $scope.isRowInListSelected = function (id) {
      return $scope.selectedCheckBoxes[id] === true;
    }

    $scope.$watch(function () {
      return Services.list();
    }, function () {
      $scope.providerGroups = Services.uniqueProviderGroups();
      $scope.ruleSets = Services.uniqueRuleSets();
    });
  }
);

