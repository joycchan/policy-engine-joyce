'use strict';

angular.module('policyEngine')
  .directive('inputSearch', function () {
    return {
      templateUrl: 'scripts/directives/input-search/input-search.html',
      controller: function ($scope) {},
      scope: {
        model: '=',
        placeholder: '@',
      },
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
