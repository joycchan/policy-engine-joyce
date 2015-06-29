'use strict';

angular.module('policyEngine').controller('ServiceAssignmentCtrl',
  function ($scope, $stateParams, PolicyStore, PolicyActions) {

    $scope.consumerGroups = [];

    $scope.onDropComplete = function(data,evt) {
      $scope.consumerGroups.push(data.item);
    };

    $scope.saveAssignment = function() {
      PolicyActions.CreateAssignment($scope.assignment);
    };

    $scope.$watchGroup(['$routeChangeSuccess', function () {
      return PolicyStore.Services.all();
    }], function () {
      $scope.service = angular.copy(PolicyStore.Services.find({id: $stateParams.itemId}));
    });
  }
);
