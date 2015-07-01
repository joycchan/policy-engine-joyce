'use strict';

angular.module('policyEngine').controller('AssignmentsCtrl',
  function ($scope, $state, PolicyStore, collapsed) {

    $scope.services = PolicyStore.Services.all.bind(PolicyStore.Services);

    $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);

    $scope.recentActivity = [];

    $scope.goToServicePolicy = function(serviceId) {
      $state.go('main.assignment.service', { itemId: serviceId });
    };

    $scope.$watch(function () {
      return PolicyStore.Assignments.all();
    }, function () {
      $scope.recentActivity = PolicyStore.Assignments.all().map(function (assignment) {
        var service = PolicyStore.Services.find({id: assignment.serviceId});
        var consumerGroupNames = _.chain(assignment.consumerGroupIds)
          .map(function (groupId) {
            return PolicyStore.Groups.find({id: groupId});
          })
          .pluck('name')
          .join(', ')
          .value();
        return {
          serviceId: service.id,
          serviceName: service.name,
          text: ' was granted to ' + consumerGroupNames + '.',
          user: 'User A',
          timestamp: moment(assignment.timestamp).fromNow()
        }
      })
    });

    $scope.collapsedGroups = collapsed.groups;
    $scope.collapsedServices = collapsed.services;
  }
);
