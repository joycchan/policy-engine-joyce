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
        if ($state.includes(STATE.categoryCards) || $state.includes(STATE.serviceCards)) {
          $state.go(STATE.categoryCards, { category: undefined, group: undefined, ruleSet: undefined });
        } else {
          $state.go(STATE.categoryList, { category: undefined, group: undefined, ruleSet: undefined });
        }
      },
      services: function() {
        return $state.includes(STATE.serviceCards) || $state.includes(STATE.serviceList);
      }    
    }

    $scope.isCategorySelected = function(category) {
      return $stateParams.category === category;
    };

    var STATE = {
      categoryCards: 'main.services.filters.cards',
      categoryList: 'main.services.filters.categoriesList',
      serviceCards: 'main.services.filters.servicesCards',
      serviceList: 'main.services.filters.list'
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
      // hide the category catalog if this returns true
      return $state.includes(STATE.categoryCards) || $state.includes(STATE.categoryList);
    };

    $scope.cardState = function() {
      return $state.includes(STATE.categoryCards) || $state.includes(STATE.serviceCards);
    };

    $scope.listState = function() {
      return $state.includes(STATE.categoryList) || $state.includes(STATE.serviceList);
    };

    $scope.selectCardState = function() {
      if ($state.includes(STATE.categoryCards) || $state.includes(STATE.categoryList)) {
        $state.go(STATE.categoryCards);
      } else if ($state.includes(STATE.serviceCards) || $state.includes(STATE.serviceList)) {
        $state.go(STATE.serviceCards);
      }
    };

    $scope.selectListState = function() {
      if ($state.includes(STATE.categoryCards) || $state.includes(STATE.categoryList)) {
        $state.go(STATE.categoryList);
      } else if ($state.includes(STATE.serviceCards) || $state.includes(STATE.serviceList)) {
        $state.go(STATE.serviceList);
      }
    };


    $scope.addFilter = function (type, object) {
      var params = {};
      params[type] = object.name;
      if ($state.includes(STATE.categoryCards)) {
        $state.go(STATE.serviceCards, params);
      } else if ($state.includes(STATE.categoryList)) {
        $state.go(STATE.serviceList, params);
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

