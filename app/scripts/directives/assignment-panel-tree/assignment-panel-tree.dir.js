'use strict';

angular.module('policyEngine')
  .directive('assignmentPanelTree', function (RecursionHelper, PolicyStore) {
    return {
      templateUrl: 'scripts/directives/assignment-panel-tree/assignment-panel-tree.html',
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

        $scope.selected = function(item) {
          return item.id === $scope.selectedId;
        };

        $scope.goTo = function (item) {
          if ($scope.navigateTo) {
            $state.go($scope.navigateTo, {itemId: item.id});
          }
        };

        $scope.toggleFolder = function(item) {
          $scope.collapsedFolders[item.id] = !$scope.collapsedFolders[item.id];
        };

        $scope.children = function(item) {
          return $scope.collapsedFolders[item.id] ? [] : item.children;
        };

        $scope.marginLeft = function(item) {
          return {'margin-left': numberOfParents(item) * 10 + 'px'}
        };

        var numberOfParents = function(item) {
          return traverseParents(item, 0);
        }

        var traverseParents = function(item, count) {
          var parent = PolicyStore.Groups.find({id: item.id}).parentId;
          if (parent) {
            count++;
            return traverseParents(PolicyStore.Groups.find({id: parent}), count);
          } 
          return count;
        }

      },
      scope: {
        items: '=',
        collapsedFolders: '=',
        selectedId: '='
      },
      restrict: 'EA',
      templateUrl: 'scripts/directives/assignment-panel-tree/assignment-panel-tree.html',
      compile: function(element) {
        return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn){

        });
      }
    };
  });
