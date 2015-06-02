'use strict';

angular.module('policyEngine').controller('RuleSetsEditCtrl',
  function($scope) {
    $scope.navTabLinks = [{
      'name': 'Settings',
      'uiSref': 'main.ruleSets.edit.settings'
    }, {
      'name': 'Services',
      'uiSref': 'main.ruleSets.edit.services'
    }];

  }
);
