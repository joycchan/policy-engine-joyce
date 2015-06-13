'use strict';

angular.module('policyEngine').controller('MainCtrl',
  function ($scope, $state, Services) {

    $scope.serviceState = function () {
      return $state.includes('main.service');
    };

    $scope.services = Services.list;

    $scope.configFlashClass = '';

    $scope.hideConfigFlash = function () {
      $scope.configFlashClass = 'hide-flash';
    };

    $scope.notConfig = function () {
      return !$state.is('main.configuration');
    };

    $scope.menubar = [
      { name: 'Services', state: 'main.services.filters.cards', selectionState: 'main.services', width: 82},
      { name: 'Assignments', state: 'main.assignments', selectionState: 'main.assignments', width: 108},
      { name: 'Groups', state: 'main.groups', selectionState: 'main.groups', width: 74},
      { name: 'Rule Sets', state: 'main.ruleSets', selectionState: 'main.ruleSets', width: 86}
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
            state: 'main.actions'
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
