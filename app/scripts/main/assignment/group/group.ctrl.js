'use strict';

angular.module('policyEngine').controller('GroupAssignmentCtrl',
  function ($scope, $stateParams, PolicyStore, PolicyActions, $state, StoreHelpers) {

    $scope.servicesConsumed = [];

    $scope.onDropComplete = function(data,evt) {
      $scope.servicesConsumed.push(data.item);
    };

    $scope.saveAssignment = function() {
      _.each($scope.servicesConsumed, function(service) {
        PolicyActions.CreateAssignment({
          serviceId: service.id,
          consumerGroupIds: [$scope.group.id]
        });
      });
      $state.go('main.assignments');
    };

    $scope.$watchGroup(['$routeChangeSuccess', function () {
      return PolicyStore.Groups.all();
    }, function() {
      return PolicyStore.Assignments.all();
    }], function () {
      $scope.group = angular.copy(PolicyStore.Groups.find({id: $stateParams.itemId}));
      $scope.servicesConsumed = StoreHelpers.servicesConsumed($scope.group);
      $scope.inheritedServicesConsumed = StoreHelpers.inheritedServicesConsumed($scope.group.id);
    });
  }
);
