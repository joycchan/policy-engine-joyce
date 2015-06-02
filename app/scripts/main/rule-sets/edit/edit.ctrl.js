'use strict';

angular.module('policyEngine').controller('RuleSetsEditCtrl',
  function($scope) {
    $scope.navTabLinks = [{
      'name': 'Settings',
      'uiSref': 'main.ruleSetsEdit.settings'
    }, {
      'name': 'Services',
      'uiSref': 'main.ruleSetsEdit.services'
    }];

    console.log("Edit")

  }
);
