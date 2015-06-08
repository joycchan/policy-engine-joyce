'use strict';

angular.module('policyEngine').controller('GroupsCtrl',
  function ($scope, $modal, groups, Modals) {

    $scope.groups = groups.byType('');


    $scope.groupFilters = [
      {name: 'All Groups'},
      {name: 'User Group'},
      {name: 'Resource Group'}
    ];

    $scope.filterGroupsListBy = function(name) {
      if(name === 'User Group')
      {
        $scope.groups = groups.byType('user');
      }
      else if(name === 'Resource Group')
      {
        $scope.groups = groups.byType('resource');
      }
      else {
        $scope.groups = groups.byType('');
      }
    };

    $scope.isRulesListFilterSelected = function(name) {
      return name === 'All Groups' ? true : false;
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

