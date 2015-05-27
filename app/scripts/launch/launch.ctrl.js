'use strict';

angular.module('policyEngine').controller('LaunchCtrl',
  function($scope) {

      $scope.mockSummaryData = {
      'Service': [{
          'name': 'Health',
          'stat': 87,
          'isGoodStat': true,
          'drawerStats': [
            {'name': 'Last Month','stat': 8,isGoodStat: true},
            {'name': 'Past Quarter','stat': 2,isGoodStat: false}
          ]
        },{
          'name': 'Count',
          'stat': 8,
          'isGoodStat': false,
          'drawerStats': [
            {'name': 'Last Month','stat': 8,isGoodStat: true},
            {'name': 'Past Quarter','stat': 2,isGoodStat: false}
          ]
        },{
          'name': 'Connections',
          'stat': 16,
          'isGoodStat': false,
          'drawerStats': [
            {'name': 'Last Month','stat': 8,isGoodStat: true},
            {'name': 'Past Quarter','stat': 2,isGoodStat: false}
          ]
      }],
      'Requests': [{
          'name': 'New',
          'stat': 5,
          'isGoodStat': true,
          'drawerStats': [
            {'name': 'Last Month','stat': 8,isGoodStat: true},
            {'name': 'Past Quarter','stat': 2,isGoodStat: false}
          ]
        },{
          'name': 'All Pending',
          'stat': 7,
          'isGoodStat': false,
          'drawerStats': [
            {'name': 'Last Month','stat': 8,isGoodStat: true},
            {'name': 'Past Quarter','stat': 2,isGoodStat: false}
          ]
      }],
      'Groups': [{
          'name': 'New',
          'stat': 2,
          'isGoodStat': true,
          'drawerStats': [
            {'name': 'Last Month','stat': 8,isGoodStat: true},
            {'name': 'Past Quarter','stat': 2,isGoodStat: false}
          ]
          },{
          'name': 'Count',
          'stat': 9,
          'isGoodStat': false,
          'drawerStats': [
            {'name': 'Last Month','stat': 8,isGoodStat: true},
            {'name': 'Past Quarter','stat': 2,isGoodStat: false}
          ]
      }]
      };

      $scope.launchCategories = [
        {'category': 'Service', img: 'images/icon_services_32.png'},
        {'category': 'Requests', img: 'images/icon_requests_32.png'},
        {'category': 'Groups', img: 'images/icon_groups_32.png'}
      ]

  }
);