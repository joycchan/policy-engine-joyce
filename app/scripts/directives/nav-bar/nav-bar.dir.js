'use strict';

angular.module('policyEngine')
  .directive('navBar', function ($state) {
    return {
      templateUrl: 'scripts/directives/nav-bar/nav-bar.html',
      scope: {
        menu: '=',
        menubar: '='
      },
      restrict: 'E',

      link: function postLink(scope, element, attrs) {
        scope.iconClasses = function(group) {
          var selected = _.any(group.sections, function(section) {
            return $state.includes(section.state);
          });
          var classes = {
            current: selected
          };
          classes[group.cssClass] = true;
          return classes;
        };

        scope.search = '';
      }
    };
  });
