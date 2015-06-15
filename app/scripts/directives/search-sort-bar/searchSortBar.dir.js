'use strict';

angular.module('policyEngine')
  .directive('searchSortBar', function ($state) {
    return {
      templateUrl: 'scripts/directives/search-sort-bar/search-sort-bar.html',
      scope: {
        cardState: '=',
        listState: '=',
        selectCardState: '=',
        selectListState: '='
      },
      restrict: 'E',

      link: function postLink(scope, element, attrs) {

        scope.search = '';
      }
    };
  });
