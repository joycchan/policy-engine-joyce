'use strict';

angular.module('policyEngine').controller('ServicesEditAssignedGroups',
  function ($scope, PolicyStore, $state, StoreHelpers) {
  
    var _groups = StoreHelpers.serviceConsumers($scope.service);

    $scope.groups = function() {
      return byCustom('');
    };

    $scope.groupFilters = [
      {name: 'All Groups'},
      {name: 'User Group', inactiveIconSrc: 'images/icon_users_16.png', activeIconSrc: 'images/icon_users_16_blue.png'},
      {name: 'Resource Group', inactiveIconSrc: 'images/icon_resources_16.png', activeIconSrc: 'images/icon_resources_16_blue.png'}
    ];

    $scope.filter = "All Groups";

    var byCustom = function (type) {
      return _.filter(_groups, function (groups) {
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

    $scope.goToAssignment = function () {
      $state.go('main.assignment.service', { itemId: $scope.service.id });
    };

  });
