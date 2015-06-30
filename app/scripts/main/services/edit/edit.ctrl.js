'use strict';

angular.module('policyEngine').controller('ServicesEdit',
  function ($scope, PolicyStore, PolicyActions, $stateParams, $state) {

    $scope.service = angular.copy(PolicyStore.Services.find({id: $stateParams.serviceId}));

    // Adding a special "Uncategorized" category with a value of null to the top of the dropdown
    var _displayedCategories = angular.copy(PolicyStore.Categories.all.bind(PolicyStore.Categories)());
    _displayedCategories.unshift({'id': null, name: "Uncategorized"});

    $scope.categories = function() {
      return _displayedCategories;
    }

    $scope.providerGroup = function() {
      return PolicyStore.Groups.find({id: $scope.service.providerGroupId});
    };

    $scope.editProviderGroup = function() {
      $state.go('main.groupsEdit.settings', { groupId: $scope.providerGroup().id });
    };

    $scope.navTabLinks = [{
      'name': 'Provider Group',
      'uiSref': 'main.servicesEdit.providerGroup'
    }, {
      'name': 'Rule Set',
      'uiSref': 'main.servicesEdit.ruleSet'
    }, {
      'name': 'Assigned Groups',
      'uiSref': 'main.servicesEdit.assignedGroups'
    }];

    $scope.$watchGroup(['service.name', 'service.description', 'service.categoryId'], function () {
      PolicyActions.UpdateService($scope.service);
    });

    $scope.categoryNameById = function(id) {
      var foundCategory =  _.find($scope.categories(), function(category) {
        return category.id === id;
      });

      if (foundCategory) {
        return foundCategory.name;
      } else if (_.isNull(id)){
        return "Uncategorized";
      } else {
        return 'empty'
      }
    };

  });
