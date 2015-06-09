'use strict';

angular.module('policyEngine').controller('LaunchCtrl',
  function ($scope, $http, Groups, assignments, Services) {

    $scope.mockSummaryData = {};

    $http.get('api/launch').success(function (data) {
      $scope.mockSummaryData = data;
    });

    $scope.Services = Services;

    $scope.connections = function() {
      return _.sum(_.map(assignments.list(), function(assignment) {
        console.log('assignment', assignment);
        return assignment.collection.length;
      }));
    };

    $scope.assignmentCount = function() {
      return assignments.list().length;
    };

    $scope.groupCount = function () {
      return Groups.list().length;
    };

  }
);
