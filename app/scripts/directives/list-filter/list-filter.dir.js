'use strict';

angular.module('policyEngine')
  .directive('listFilter', function () {
    return {
      templateUrl: 'scripts/directives/list-filter/list-filter.html',
      scope: {
        filterName: '=',
        filterBy: '=',
        isFilterSelected: '='
      },
      restrict: 'E',
    };
  });
