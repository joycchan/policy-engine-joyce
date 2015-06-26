'use strict';

angular.module('policyEngine')
  .directive('existingGroup', function () {
    return {
      templateUrl: 'scripts/directives/existing-group/existing-group.html',
      scope: {
        groups: '='
      },
      restrict: 'E'
    };
  });
