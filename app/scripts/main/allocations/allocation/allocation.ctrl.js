'use strict';

angular.module('policyEngine').controller('AllocationCtrl',
  function ($scope, $stateParams) {

    $scope.group = {
      servicesProvided: [],
      servicesConsumed: []
    };

    $scope.$watchGroup(['$routeChangeSuccess', 'groups'], function () {
      if ($stateParams.groupId && $scope.groups.length > 0) {
        $scope.group = _.find($scope.groups, function (group) {
          return group.id === $stateParams.groupId;
        });
      }
    });

  }
);
