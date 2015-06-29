'use strict';

angular.module('policyEngine')
  .directive('assignmentPanel', function () {
    return {
      templateUrl: 'scripts/directives/assignment-panel/assignment-panel.html',
      controller: function ($scope, $state) {

        $scope.dragData = function(item) {
          return {
            type: $scope.type,
            item: item
          }
        };

        $scope.itemIcon = function(item) {
          if ($scope.type === 'groupCentric') {
            return 'service';
          } else if(item.type === 'resource') {
            return 'resource';
          } else {
            return 'user';
          }
        };

        $scope.goTo = function(item) {
          if ($scope.navigateTo) {
            $state.go($scope.navigateTo, { itemId: item.id });
          }
       };

      },
      scope: {
        title: '@',
        items: '=',
        type: '@',
        navigateTo: '@',

      },
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
