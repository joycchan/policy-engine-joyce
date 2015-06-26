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
            return $state.includes(section.state) || stateIncludesAnyAssociatedStates(section.associatedStates);
          });
          var classes = {
            current: selected
          };
          classes[group.cssClass] = true;
          return classes;
        };

        var stateIncludesAnyAssociatedStates = function(associatedStates) {
          return _.any(associatedStates, function(state) {
            return $state.includes(state);
          });
        }

        scope.selected = function(item) {
          return $state.includes(item.selectionState) || stateIncludesAnyAssociatedStates(item.associatedStates);
        };

        scope.search = '';
      }
    };
  });
