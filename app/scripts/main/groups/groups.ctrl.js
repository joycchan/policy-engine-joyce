'use strict';

angular.module('policyEngine').controller('GroupsCtrl',
  function ($scope, $modal, PolicyStore, PolicyActions, Modals, $state, StoreHelpers) {

    $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);
    $scope.deleteGroup = PolicyActions.DeleteGroup;

    $scope.groupFilters = [
      {name: 'All Groups'},
      {name: 'User Group', 'inactiveIconSrc': 'images/icon_users_16.png', 'activeIconSrc': 'images/icon_users_16_blue.png'},
      {name: 'Resource Group', 'inactiveIconSrc': 'images/icon_resources_16.png', 'activeIconSrc': 'images/icon_resources_16_blue.png'}
    ];

    $scope.filter = "All Groups";

    $scope.filterGroupsListBy = function(name) {
      $scope.filter = name;

      if(name === 'User Group')
      {
        $scope.groups = function() {return PolicyStore.Groups.where({type: 'user'})};
      }
      else if(name === 'Resource Group')
      {
        $scope.groups = function() {return PolicyStore.Groups.where({type: 'resource'})};
      }
      else {
        $scope.groups = function() {return PolicyStore.Groups.all(); }; 
      }
    };

    $scope.isGroupsListFilterSelected = function(name) {
      return name === $scope.filter;
    };

    $scope.open = function () {

      var modalInstance = $modal.open(Modals.newGroup);
      modalInstance.result.then(function (newGroup) {
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    $scope.edit = function(group) {
     return $state.go('main.groupsEdit.settings', { groupId: group.id });
    };

    $scope.groupStatusCell = function(group) {
      //what to display in the first table cell in the row.
      //either "loading", "user", or "resource"
      if ($scope.isLoading(group)) return "loading";
      return group.type;
    };

    $scope.isLoading = function(group) {
      return !_.isUndefined(PolicyStore.Requests.find({
        object: group.id,  
        complete: false,
      }));
    };

    $scope.servicesProvided = function(group) {
      return StoreHelpers.servicesProvided(group).length;
    };

    $scope.servicesConsumed = function(group) {
      return StoreHelpers.servicesConsumed(group).length;
    };

  }
);

