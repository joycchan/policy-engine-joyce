'use strict';

angular.module('policyEngine').controller('LaunchCtrl',
  function ($scope, $http, PolicyStore) {

    $scope.mockSummaryData = {};

    $http.get('api/launch').success(function (data) {
      $scope.mockSummaryData = data;
    });

    $scope.connections = function () {
      return _.sum(_.map(PolicyStore.Assignments.all(), function (assignment) {
        return assignment.collection.length;
      }));
    };

    $scope.serviceCount = function() {
      return PolicyStore.Services.all().length;
    };

    $scope.assignmentCount = function () {
      return PolicyStore.Assignments.all().length;
    };

    $scope.groupCount = function () {
      return PolicyStore.Groups.all().length;
    };

    $scope.newGroupCount = function () {
      return _.max([0, $scope.groupCount() - 13]);
    };

  }
);
