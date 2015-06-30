'use strict';

angular.module('policyEngine')
  .directive('assignmentPanel', function () {
    return {
      templateUrl: 'scripts/directives/assignment-panel/assignment-panel.html',
      controller: function ($scope, $state) {

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

        $scope.goTo = function (item) {
          if ($scope.navigateTo) {
            $state.go($scope.navigateTo, {itemId: item.id});
          }
        };

        $scope.nestedItems = [];

        var getNestedChildren = function (arr, parent) {
          var out = []
          for(var i in arr) {
            if(arr[i].parentId == parent) {
              var children = getNestedChildren(arr, arr[i].id)

              if(children.length) {
                arr[i].children = children
              }
              out.push(arr[i])
            }
          }
          return out
        };


        $scope.$watch('items', function() {
          if ($scope.items.length) {
            $scope.nestedItems = getNestedChildren(angular.copy($scope.items));
          }
        });

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
