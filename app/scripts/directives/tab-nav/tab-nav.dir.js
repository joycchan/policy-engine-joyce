'use strict';

angular.module('policyEngine')
  .directive('tabNav', function () {
    return {
      templateUrl: 'scripts/directives/tab-nav/tab-nav.html',
      scope: {
        // tabs is an array of objects that will be repeated over to create links.
        // Each object should have a 'name' and 'uiSref' property.
        // e.g. [{'name': 'Settings', 'uiSref': 'main.ruleSets.edit.settings'}, 
        // {'name': 'Services', 'uiSref': 'main.ruleSets.edit.services'}]
        tabs: '='
      },
      restrict: 'E'
    };
  });
