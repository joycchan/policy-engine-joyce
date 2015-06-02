'use strict';

angular.module('policyEngine')
  .directive('listCount', function () {
    return {
      templateUrl: 'scripts/directives/list-count/list-count.html',
      scope: {
        count: '='
      },
      restrict: 'E',
    };
  });
