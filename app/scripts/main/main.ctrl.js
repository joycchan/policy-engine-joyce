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

    $scope.menu = [
      {
        cssClass: 'services',
        sections: [
          {
            label: 'Services',
            state: 'main.services.categories'
          },
          {
            label: 'Assignments',
            state: 'main.allocations'
          }
        ]
      },
      {
        cssClass: 'groups',
        sections: [
          {
            label: 'Groups',
            state: 'main.groups'
          },
          {
            label: 'Rule Sets',
            state: 'main.ruleSets'
          },
          {
            label: 'Dependency Graphs',
            state: '#'
          }
        ]
      },
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
            label: 'Application Settings',
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
