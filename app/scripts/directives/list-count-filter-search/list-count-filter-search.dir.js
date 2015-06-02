'use strict';

angular.module('policyEngine')
  .directive('listCountFilterSearch', function () {
    return {
      templateUrl: 'scripts/directives/list-count-filter-search/list-count-filter-search.html',
      scope: {
        count: '=',
        filters: '=',
        filterBy: '=',
        isFilterSelected: '=',
        searchModel: '='
      },
      restrict: 'E'
    };
  });
