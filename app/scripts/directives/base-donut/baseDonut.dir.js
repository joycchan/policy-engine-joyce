'use strict';

angular.module('policyEngine')
  .directive('baseDonut', function () {
    return {
      templateUrl: 'scripts/directives/base-donut/base-donut.html',
      controller: function ($scope) {
      },
      scope: {
        name: '=',
        show: '=',
        drop: '='
      },
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
      }
    }
  });

