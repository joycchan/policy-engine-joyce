'use strict';

angular.module('policyEngine')
  .directive('assignmentPanel', function () {
    return {
      templateUrl: 'scripts/directives/assignment-panel/assignment-panel.html',
      controller: function ($scope) {

        $scope.dragData = function(item) {
          return {
            type: $scope.type,
            item: item
          }
        };

        $scope.itemIcon = function(item) {
          if ($scope.type === 'provide') {
            return 'service';
          } else if(item.type === 'resource') {
            return 'resource';
          } else {
            return 'user';
          }
        };

      },
      scope: {
        title: '@',
        items: '=',
        type: '@',
        newState: '@'
      },
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
