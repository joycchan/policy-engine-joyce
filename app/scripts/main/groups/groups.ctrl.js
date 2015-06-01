'use strict';

angular.module('policyEngine').controller('GroupsCtrl',
  function ($scope, $modal, groups) {

    $scope.groups = groups.list;

    $scope.open = function () {

      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'scripts/main/groups/new.html',
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

