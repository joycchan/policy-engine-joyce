'use strict';

angular.module('policyEngine').controller('ServiceAssignmentCtrl',
  function ($scope, $stateParams, PolicyStore, PolicyActions, $state, StoreHelpers) {

    $scope.consumerGroups = [];
    $scope.inheritedConsumerGroups = [];

    $scope.onDropComplete = function(data,evt) {
      $scope.consumerGroups.push(data.item);
    };


    $scope.saveAssignment = function() {
      PolicyActions.CreateAssignment({
        serviceId: $scope.service.id,
        consumerGroupIds: _.pluck($scope.consumerGroups, 'id')
      });
      $state.go('main.assignments');
    };

    $scope.$watchGroup(['$routeChangeSuccess', function () {
      return PolicyStore.Services.all();
    }, function() {
      return PolicyStore.Assignments.all();
    }], function () {
      $scope.service = angular.copy(PolicyStore.Services.find({id: $stateParams.itemId}));
      $scope.consumerGroups = StoreHelpers.serviceConsumers($scope.service);
      $scope.inheritedConsumerGroups = StoreHelpers.inheritedConsumerGroups($scope.service.id);
    });
  }
);
