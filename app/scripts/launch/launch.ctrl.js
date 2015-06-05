'use strict';

angular.module('policyEngine').controller('LaunchCtrl',
  function($scope, $http) {

      $scope.mockSummaryData = {};

      $http.get('api/launch').success(function (data) {
        $scope.mockSummaryData = data;
      });

      $scope.launchCategories = [
        {'category': 'Service', img: 'images/icon_services_32.png', state: 'main.services'},
        {'category': 'Requests', img: 'images/icon_requests_32.png', state: 'main.allocations'},
        {'category': 'Groups', img: 'images/icon_groups_32.png', state: 'main.groups'}
      ];

  }
);
