'use strict';

angular.module('policyEngine')
  .directive('launchBubble', function () {
    return {
      templateUrl: 'scripts/directives/launch-bubble/launch-bubble.html',
      controller: function ($scope) {},
      scope: {
        // string to display
        name: '=',
        // number to display
        stat: '=',
        // boolean value which will determine what color to display the stat
        isGoodStat: '=',
        // array of objects of stats to display on hover
        drawerStats: '='
      },
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
