'use strict';

angular.module('policyEngine').controller('ServicesEdit',
  function ($scope, PolicyStore, $stateParams, $modal, Modals) {
    $scope.service = function() {
      return _.find(PolicyStore.Services.all(), function(service) {
        return service.name === $stateParams.serviceId;
      });
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

    $scope.ruleSet = function() {
      // TODO: replace this punt.  This function only returns a rule.
      return _.first(PolicyStore.RuleSets.all());
    }

    $scope.editRule = function () {
      var modalInstance = $modal.open(Modals.ruleSetEditor(angular.copy($scope.ruleSet())));

      modalInstance.result.then(function (updatedRuleSet) {
        PolicyStore.RuleSets.update({id: updatedRuleSet.id}, updatedRuleSet)
      }, function () {
      });
    };

    $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);

    $scope.groupFilters = [
      {name: 'All Groups'},
      {name: 'User Group', inactiveIconSrc: 'images/icon_users_16.png', activeIconSrc: 'images/icon_users_16_blue.png'},
      {name: 'Resource Group', inactiveIconSrc: 'images/icon_resources_16.png', activeIconSrc: 'images/icon_resources_16_blue.png'}
    ];

    $scope.filter = "All Groups";

    var byCustom = function (type) {
      return _.filter(PolicyStore.Groups.all.bind(PolicyStore.Groups)(), function (groups) {
        if (type === "") {
          return groups;
        }
        else {
          return groups.type === type;
        }
      });
    };

    $scope.filterGroupsList = function (name) {
      $scope.filter = name;

      if (name === 'User Group') {
        $scope.groups = function () {
          return byCustom('user')
        };
      }
      else if (name === 'Resource Group') {
        $scope.groups = function () {
          return byCustom('resource')
        };
      }
      else {
        $scope.groups = function () {
          return byCustom('')
        };
      }
    };

    $scope.isGroupsListFilterSelected = function (name) {
      return name === $scope.filter;
    };

    

  });
