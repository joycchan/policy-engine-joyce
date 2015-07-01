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

    $scope.breadCrumbs = {
      categoriesClick: function() {
        if ($state.includes('main.services.filters.categoriesCards') || $state.includes('main.services.filters.servicesCards')) {
          $state.go('main.services.filters.categoriesCards', { category: undefined, group: undefined, ruleSet: undefined });
        } else {
          $state.go('main.services.filters.categoriesList', { category: undefined, group: undefined, ruleSet: undefined });
        }
      },
      services: function() {
        return $state.includes('main.services.filters.servicesCards') || $state.includes('main.services.filters.servicesList');
      }    
    }

    $scope.isCategorySelected = function(category) {
      return $stateParams.category === category;
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
      return $state.includes('main.services.filters.categoriesCards') || $state.includes('main.services.filters.categoriesList');
    };

    $scope.cardState = function() {
      return $state.includes('main.services.filters.categoriesCards') || $state.includes('main.services.filters.servicesCards');
    };

    $scope.listState = function() {
      return $state.includes('main.services.filters.categoriesList') || $state.includes('main.services.filters.servicesList');
    };

    $scope.selectCardState = function() {
      if ($state.includes('main.services.filters.categoriesCards') || $state.includes('main.services.filters.categoriesList')) {
        $state.go('main.services.filters.categoriesCards');
      } else if ($state.includes('main.services.filters.servicesCards') || $state.includes('main.services.filters.servicesList')) {
        $state.go('main.services.filters.servicesCards');
      }
    };

    $scope.selectListState = function() {
      if ($state.includes('main.services.filters.categoriesCards') || $state.includes('main.services.filters.categoriesList')) {
        $state.go('main.services.filters.categoriesList');
      } else if ($state.includes('main.services.filters.servicesCards') || $state.includes('main.services.filters.servicesList')) {
        $state.go('main.services.filters.servicesList');
      }
    };


    $scope.addFilter = function (type, object) {
      var params = {};
      params[type] = object.name;
      if ($state.includes('main.services.filters.categoriesCards')) {
        $state.go('main.services.filters.servicesCards', params);
      } else if ($state.includes('main.services.filters.categoriesList')) {
        $state.go('main.services.filters.servicesList', params);
      } else {
        $state.go('.', params);
      }
    };

    $scope.removeFilter = function(type) {
      var params = {};
      params[type] = undefined;
      $state.go('.', params);
    };

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

