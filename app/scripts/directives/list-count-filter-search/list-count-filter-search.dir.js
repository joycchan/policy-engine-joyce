'use strict';

angular.module('policyEngine')
  .directive('listCountFilterSearch', function () {
    return {
      templateUrl: 'scripts/directives/list-count-filter-search/list-count-filter-search.html',
      scope: {
        count: '=',
        // an array of objects.  Each with a 'name' key, and optional 'inactiveIconSrc' and 'activeIconSrc' keys
        // e.g. [{name: 'All Groups'},{name: 'User Group', inactiveIconSrc: 'images/icon_users_16.png', activeIconSrc: 'images/icon_users_16_blue.png'},]
        filters: '=',
        filterBy: '=',
        isFilterSelected: '=',
        searchModel: '='
      },
      restrict: 'E'
    };
  });
