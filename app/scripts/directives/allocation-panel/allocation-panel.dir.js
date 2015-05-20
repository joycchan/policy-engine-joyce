'use strict';

angular.module('policyEngine')
  .directive('allocationPanel', function () {
    return {
      templateUrl: 'scripts/directives/allocation-panel/allocation-panel.html',
      controller: function ($scope) {
      },
      scope: {
        title: '@',
        items: '=',
        mask: '='
      },
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
