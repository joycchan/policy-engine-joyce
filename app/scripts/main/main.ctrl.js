'use strict';

angular.module('policyEngine').controller('MainCtrl',
  function ($scope, $http, $state, assignments) {

    $scope.serviceState = function () {
      return $state.includes('main.service');
    };

    $scope.services = [];

    $http.get('api/services').success(function (data) {
      $scope.services = data;
    });

    $scope.configFlashClass = '';

    $scope.hideConfigFlash = function() {
      $scope.configFlashClass = 'hide-flash';
    };

    $scope.notConfig = function() {
      return !$state.is('main.configuration');
    };

    $scope.menubar = [
      {'category': 'Services', state: 'main.services.categories'},
      {'category': 'Assignments', state: 'main.allocations'},
      {'category': 'Groups', state: 'main.groups'},
      {'category': 'Rule Sets', state: 'main.ruleSets'}
    ];

    $scope.menu = [
      {
        cssClass: 'setup',
        sections: [
          {
            label: 'Classifiers Library',
            state: '#'
          },
          {
            label: 'Actions Library',
            state: '#'
          },
          {
            label: 'Setup',
            state: 'main.configuration'
          }
        ]
      },
      {
        cssClass: 'account',
        sections: [
          {
            label: 'Account Settings',
            state: 'main.account'
          },
          {
            label: 'Logout',
            state: '#'
          }
        ]
      }
    ];
  }
);
