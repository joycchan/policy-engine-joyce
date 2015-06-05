'use strict';

angular.module('policyEngine').controller('LaunchCtrl',
  function($scope, $http, groups, assignments) {

      $scope.mockSummaryData = {};

      $http.get('api/launch').success(function (data) {
        $scope.mockSummaryData = data;
      });

      $scope.launchCategories = [
        {'category': 'Service', img: 'images/icon_services_32.png', state: 'main.services'},
        {'category': 'Assignments', img: 'images/icon_requests_32.png', state: 'main.allocations'},
        {'category': 'Groups', img: 'images/icon_groups_32.png', state: 'main.groups'}
      ];

      $scope.groupCount = function() {
        return groups.list().length;
      };

      $scope.assignmentsCount = function() {
        return groups.list().length;
      }

  }
);
