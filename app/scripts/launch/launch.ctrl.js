'use strict';

angular.module('policyEngine').controller('LaunchCtrl',
  function($scope) {

      $scope.mockSummaryData = {
      'Service': [
          {'name': 'Health','stat': 87, 'isGoodStat': true},
          {'name': 'Count', 'stat': 8, 'isGoodStat': false},
          {'name': 'Connections', 'stat': 16, 'isGoodStat': false}
        ],
        'Requests': [
          {'name': 'New','stat': 5, 'isGoodStat': true},
          {'name': 'All Pending', 'stat': 7, 'isGoodStat': false}
        ],
        'Groups': [
          {'name': 'New','stat': 2, 'isGoodStat': true},
          {'name': 'Count', 'stat': 9, 'isGoodStat': false}
        ]
      };

      $scope.launchCategories = [
        {'category': 'Service', img: 'images/icon_services_32.png'},
        {'category': 'Requests', img: 'images/icon_requests_32.png'},
        {'category': 'Groups', img: 'images/icon_groups_32.png'}
      ]

  }
);
