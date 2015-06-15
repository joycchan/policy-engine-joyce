'use strict';

angular.module('policyEngine').controller('GroupsCtrl',
  function ($scope, $modal, PolicyStore, PolicyActions, Modals, $state) {

    $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);
    $scope.deleteGroup = PolicyActions.DeleteGroup;

    window.scope = $scope;

    $scope.groupFilters = [
      {name: 'All Groups'},
      {name: 'User Group'},
      {name: 'Resource Group'}
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

    $scope.isRulesListFilterSelected = function(name) {
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
  }
);

