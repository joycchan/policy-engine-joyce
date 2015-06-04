'use strict';

angular.module('policyEngine').controller('GroupsCtrl',
  function ($scope, $modal, groups) {

    $scope.groups = groups.list;

    $scope.groupFilters = [
      {name: 'All Groups'},
      {name: 'User Group'},
      {name: 'Resource Group'}
    ];

    $scope.isRulesListFilterSelected = function(name) {
      return name === 'All Groups' ? true : false;
    };

    $scope.open = function () {

      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'scripts/main/groups/new.html',
        windowTemplateUrl: 'scripts/templates/modal/window.html',
        controller: 'NewGroupCtrl',
        size: 'lg'
     });

      modalInstance.result.then(function (newGroup) {
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
  }
);

