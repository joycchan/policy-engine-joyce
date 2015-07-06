'use strict';

angular.module('policyEngine')
  .directive('assignmentPanel', function () {
    return {
      templateUrl: 'scripts/directives/assignment-panel/assignment-panel.html',
      controller: function ($scope, $state, StoreHelpers) {

        $scope.dragData = function (item) {
          return {
            type: $scope.type,
            item: item
          }
        };

        $scope.itemIcon = function (item) {
          if (item.children && item.children.length) {
            return 'folder';
          } else if ($scope.type === 'groupCentric') {
            return 'service';
          } else if (item.type === 'resource') {
            return 'resource';
          } else {
            return 'user';
          }
        };

        $scope.selected = function(item) {
          return item.id === $scope.selectedId;
        };

        $scope.toggleFolder = function(item) {
          $scope.collapsedFolders[item.id] = !$scope.collapsedFolders[item.id];
        };

        // must use this in $scope.children, otherwise it causes a 10 iterations reached error when toggling folders
        var _emptyArray = [];

        $scope.children = function(item) {
          return $scope.collapsedFolders[item.id] ? _emptyArray : item.children;
        };

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
