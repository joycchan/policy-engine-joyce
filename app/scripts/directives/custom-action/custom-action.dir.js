'use strict';

angular.module('policyEngine')
  .directive('customAction', function () {
    return {
      templateUrl: 'scripts/directives/custom-action/custom-action.html',
      controller: function ($scope) {
        $scope.actionSelect = 'table';
      },

      scope: {
        action: '=',
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
