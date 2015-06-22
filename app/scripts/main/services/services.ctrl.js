'use strict';

angular.module('policyEngine').controller('ServicesCtrl',
  function ($scope, $state, PolicyStore, PolicyActions, StoreHelpers) {

    $scope.getChild = StoreHelpers.getChild;

    $scope.filtered = {
      category: false,
      group: false,
      ruleSet: false
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
      var assignment = PolicyActions.CreateAssignment({
        type: 'serviceCentric',
        item: service,
        collection: []
      });
      $state.go('main.assignment.serviceCentric', {assignmentId: assignment.id});
    };

    $scope.serviceConsumers = function (service) {
      var groups = [];

      var groupCentrics = _.filter(PolicyStore.Assignments.where({type: 'groupCentric'}), function (assignment) {
        return _.find(assignment.collection, function (s) {
          return s.name === service.name;
        })
      });


      _.each(groupCentrics, function (assignment) {
        groups.push(assignment.item);
      });

      var serviceCentrics = _.filter(PolicyStore.Assignments.where({type: 'serviceCentric'}), function (assignment) {
        return assignment.item.name === service.name;
      });

      _.each(serviceCentrics, function (assignment) {
        groups = groups.concat(assignment.collection);
      });

      return groups;
    };

    $scope.serviceConsumersString = function (service) {
      return _.pluck($scope.serviceConsumers(service), 'name').join(', ');
    };

    $scope.servicesByCategory = function(category) {
      _.filter(PolicyStore.Services.all(), {category: {name: 'category'}});
    };

    $scope.deleteCategory = function(category) {
      _.remove($scope.categories, function(c) {
        return c.name === category.name;
      });
    };

    $scope.deleteService = PolicyActions.DeleteService;

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

    var createListFromService = function(service, key) {
      // returns an array of objects w/ a 'name' key on each
      // e.g. [{name: 'SQL Access'}, {name: 'HTTP Access'}]
      var list = _.map(service, function(s) {
        return s[key];
      });
      return _.uniq(list, function(item) {
        return item.name;
      });
    }

    $scope.$watch(function () {
      return PolicyStore.Services.all();
    }, function (newServices) {
      $scope.providerGroups = createListFromService(newServices, 'group');
      $scope.ruleSets = createListFromService(newServices, 'ruleSet');
    });
  }
);

