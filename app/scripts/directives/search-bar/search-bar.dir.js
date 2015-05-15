'use strict';

angular.module('policyEngine')
  .directive('searchBar', function() {
    return {
      templateUrl: 'scripts/directives/search-bar/search-bar.html',
      controller: function($scope) {},
      scope: {
        //list: '='
      },
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
