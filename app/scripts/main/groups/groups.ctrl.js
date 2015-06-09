'use strict';

angular.module('policyEngine').controller('GroupsCtrl',
  function ($scope, $modal, Groups, Modals) {

    $scope.groups = Groups.list;
    $scope.deleteGroup = Groups.delete;

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
        $scope.groups = function() {return Groups.byType('user')};
      }
      else if(name === 'Resource Group')
      {
        $scope.groups = function() {return Groups.byType('resource')};
      }
      else {
        $scope.groups = function() {return Groups.byType('')};
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
  }
);

