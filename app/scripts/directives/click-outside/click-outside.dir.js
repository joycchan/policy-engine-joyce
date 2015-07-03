'use strict';

angular.module('policyEngine')
  .directive('clickOutside', function ($document, $timeout) {
    return {
      scope: {
        close: '=',
        isOpen: '='
      },
      link: function postLink(scope, element, attrs) {

        scope.$watch('isOpen', function() {
          if (scope.isOpen === true) {
            $document.bind('click', clickHandler);
          } else {
           // Unbind the click handler when the user closes the element any other way besides clicking outside the element.
            unbindClickHandler();
          }
        });

        var clickHandler = function(event) {
          var isClickedElementChildOfPopup = element.find(event.target).length > 0;

          if (!isClickedElementChildOfPopup) {
            scope.close();
            // Run this on the next digest cycle.  This will prevent '$digest already in progress' errors.
            $timeout(function() {
              scope.$apply();
            });
            unbindClickHandler();
          }
        }

        var unbindClickHandler = function() {
          $document.off('click', clickHandler);
        };

        scope.$on('$destroy', function() {
          unbindClickHandler();
        });

      },
      restrict: 'A'
    };
  });
