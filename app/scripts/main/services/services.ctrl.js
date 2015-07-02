'use strict';

angular.module('policyEngine').controller('ServicesCtrl',
  function ($scope, $state, PolicyStore, PolicyActions, StoreHelpers, $stateParams) {

    $scope.getChild = StoreHelpers.getChild;

    $scope.loadingServices = function() {
      return PolicyStore.Requests.where({action: "FetchServices", complete: false}).length > 0;
    };

    $scope.filtered = {
      category: false,
      group: false,
      ruleSet: false
    };

    $scope.providerGroup = function(service) {
      return PolicyStore.Groups.find({id: service.providerGroupId});
    };

    $scope.ruleSet = function(service) {
      return PolicyStore.RuleSets.find({id: service.ruleSetId});
    };

    $scope.category = function(service) {
      return PolicyStore.Categories.find({id: service.categoryId});
    };

    $scope.categoryState = function() {
      return !$scope.filtered['category'] && !$state.is('main.services.filters.list');
    };

    $scope.cardState = function() {
      return $state.is('main.services.filters.cards');
    };

    $scope.listState = function() {
      return $state.is('main.services.filters.list');
    };

    $scope.selectCategoryState = function() {
      $state.go('main.services.filters.cards', { category: undefined, group: undefined, ruleSet: undefined });
    };

    $scope.selectListState = function() {
      $state.go('main.services.filters.list');
    };

    $scope.toggleFilter = function (type, object) {
      var params = {};
      if ($stateParams[type] === object.name) {
        params[type] = undefined;
      } else {
        params[type] = object.name;
      }

      $state.go('.', params);
    };

    $scope.removeAllFilters = function() {
      var params = {
        category: undefined,
        group: undefined,
        ruleSet: undefined
      }
      $state.go('.', params);
    }

    $scope.isSectionItemSelected = function(section, item) {
      return $stateParams[section] === item;
    }

    $scope.assignService = function (service) {
      $state.go('main.assignment.service', { itemId: service.id });
    };

    $scope.serviceConsumers = function (service) {
      return StoreHelpers.serviceConsumers(service);
    };

    $scope.serviceConsumersString = function (service) {
      return _.pluck($scope.serviceConsumers(service), 'name').join(', ');
    };

    $scope.servicesByCategory = function(category) {
      _.filter(PolicyStore.Services.all(), {category: {name: 'category'}});
    };

    $scope.deleteCategory = PolicyActions.DeleteCategory;
    $scope.deleteService = PolicyActions.DeleteService;

    $scope.providerGroups = [];
    $scope.ruleSets = [];
    // Adding a category object with an image to the end of the category cards
    var _displayedCategories = angular.copy(PolicyStore.Categories.all.bind(PolicyStore.Categories)());
    _displayedCategories.push({'id': null, name: "Uncategorized", "image": "photo_uncategorized.png"});
    $scope.categories = function() {
      return _displayedCategories;
    }

    $scope.categoryImage = function(category) {
      return '../../../images/' + category.image;
    };

    $scope.selectedCheckBoxes = {};

    $scope.isRowInListSelected = function (id) {
      return $scope.selectedCheckBoxes[id] === true;
    };

    var uniqueNames = function(services, mapFunc) {
      return _.chain(services)
        .map(mapFunc)
        .uniq(function(object) { return object.name; })
        .value()
    };

    $scope.$watch(function () {
      return PolicyStore.Services.all();
    }, function (newServices) {
      $scope.providerGroups = uniqueNames(newServices, $scope.providerGroup);
      $scope.ruleSets = uniqueNames(newServices, $scope.ruleSet);
    });

  }
);

