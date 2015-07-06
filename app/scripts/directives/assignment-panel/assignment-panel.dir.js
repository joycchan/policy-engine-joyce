'use strict';

angular.module('policyEngine')
  .directive('assignmentPanel', function () {
    return {
      templateUrl: 'scripts/directives/assignment-panel/assignment-panel.html',
      controller: function ($scope, $state, StoreHelpers) {

        $scope.goTo = function (item) {
          if ($scope.navigateTo) {
            $state.go($scope.navigateTo, {itemId: item.id});
          }
        };

        $scope.nestedItems = [];

        $scope.$watch('items', function() {
          if ($scope.items.length) {
            $scope.nestedItems = StoreHelpers.getNestedChildren(angular.copy($scope.items));
          }
        });

      },
      scope: {
        title: '@',
        items: '=',
        type: '@',
        navigateTo: '@',
        collapsedFolders: '=',
        selectedId: '='

      },
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
