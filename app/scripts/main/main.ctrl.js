'use strict';

angular.module('policyEngine').controller('MainCtrl',
  function ($scope, $state) {

    $scope.serviceState = function () {
      return $state.includes('main.service');
    };

    $scope.configFlashClass = '';

    $scope.hideConfigFlash = function () {
      $scope.configFlashClass = 'hide-flash';
    };

    $scope.notConfig = function () {
      return !$state.is('main.configuration');
    };

    $scope.menubar = [{
      name: 'Services',
      state: 'main.services.filters.cards',
      selectionState: 'main.services',
      associatedStates: ['main.servicesEdit', 'main.service.form'],
      width: 82
    }, {
      name: 'Assignments',
      state: 'main.assignments',
      selectionState: 'main.assignments',
      associatedStates: ['main.assignment'],
      width: 108
    }, {
      name: 'Groups',
      state: 'main.groups',
      selectionState: 'main.groups',
      associatedStates: ['main.groupsEdit', 'main.listNew.group', 'main.service.newGroup', 'main.service.importGroup'],
      width: 74
    }, {
      name: 'Rule Sets',
      state: 'main.ruleSets',
      selectionState: 'main.ruleSets',
      associatedStates: ['main.ruleSetsEdit', 'main.service.newRuleSet', 'main.listNew.ruleSet', 'main.service.newRuleSet'],
      width: 86
    }];


    // // if the user is in service creation flow, and they navigate to "Create new rule set", the Services tab will be active in the nav bar.
    // $scope.menubar = [{
    //   name: 'Services',
    //   state: 'main.services.filters.cards',
    //   selectionState: 'main.services',
    //   associatedStates: ['main.servicesEdit', 'main.service'],
    //   width: 82
    // }, {
    //   name: 'Assignments',
    //   state: 'main.assignments',
    //   selectionState: 'main.assignments',
    //   associatedStates: ['main.assignment'],
    //   width: 108
    // }, {
    //   name: 'Groups',
    //   state: 'main.groups',
    //   selectionState: 'main.groups',
    //   associatedStates: ['main.groupsEdit'],
    //   width: 74
    // }, {
    //   name: 'Rule Sets',
    //   state: 'main.ruleSets',
    //   selectionState: 'main.ruleSets',
    //   associatedStates: ['main.ruleSetsEdit'],
    //   width: 86
    // }];


    $scope.menu = [
      {
        cssClass: 'setup',
        sections: [
          {
            label: 'Classifiers Library',
            state: 'main.classifiers'
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

    $scope.background = function() {
      if ($state.includes('main.services') ||
          $state.includes('main.assignments')) {
        return 'gray';
      }
    };
  }
);
