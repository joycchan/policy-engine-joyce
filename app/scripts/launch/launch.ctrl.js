'use strict';

angular.module('policyEngine').controller('LaunchCtrl',
  function ($scope, $http, Groups, assignments, PolicyStore) {

    $scope.mockSummaryData = {};

    $http.get('api/launch').success(function (data) {
      $scope.mockSummaryData = data;
    });

    $scope.connections = function () {
      return _.sum(_.map(assignments.list(), function (assignment) {
        console.log('assignment', assignment);
        return assignment.collection.length;
      }));
    };

    $scope.serviceCount = function() {
      return PolicyStore.Tables.Services.all().length;
    };

    $scope.assignmentCount = function () {
      return assignments.list().length;
    };

    $scope.groupCount = function () {
      return Groups.list().length;
    };

    $scope.newGroupCount = function () {
      return _.max([0, $scope.groupCount() - 13]);
    };

  }
);
