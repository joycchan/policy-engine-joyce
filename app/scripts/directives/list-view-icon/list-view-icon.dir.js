'use strict';

angular.module('policyEngine')
  .directive('listViewIcon', function () {
    return {
      templateUrl: 'scripts/directives/list-view-icon/list-view-icon.html',
      scope: {
        // activeSrc and inactiveSrc take strings as url for images
        activeSrc: '@',
        inactiveSrc: '@'
      },
      restrict: 'E'
    };
  });
