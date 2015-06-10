'use strict';

angular.module('policyEngine').controller('AssignmentCtrl',
  function($scope, $state, Groups, Services) {

    $scope.services = Services.list;

    $scope.maskGroups = function() {
      return $state.is('main.assignment.existing.consume');
    };

    $scope.maskServices = function () {
      return $state.is('main.assignment.existing.provide');
    };

    $scope.groups = Groups.list;

    $scope.$state = $state;

  }
);
