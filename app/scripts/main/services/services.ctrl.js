'use strict';

angular.module('policyEngine').controller('ServicesCtrl',
  function ($scope, $state, assignments) {

    $scope.assignService = function (service) {
      var allocation = assignments.create('provide', service)
      $state.go('main.allocation.existing.provide', {allocationId: allocation.id});
    };

    $scope.categories = [
      {
        label: 'Backup and Storage'
      },
      {
        label: 'Business & Productivity Tools'
      },
      {
        label: 'Database'
      },
      {
        label: 'Email'
      },
      {
        label: 'Internet Security'
      },
      {
        label: 'Software Updates'
      },
      {
        label: 'Voice and Video'
      },
    ];

    $scope.providerGroups = [
      {
        name: 'My New Group'
      },
      {
        name: 'SQL Servers Internal'
      },
      {
        name: 'SQL Servers External'
      }
    ];

    $scope.ruleSets = [
      {
        name: 'MY HQ Rule Set'
      },
      {
        name: 'MY Basic Rule Set'
      },
      {
        name: 'SQL Rule Set'
      }
    ];
  }
);

