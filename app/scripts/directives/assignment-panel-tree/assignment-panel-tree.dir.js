'use strict';

angular.module('policyEngine')
  .directive('assignmentPanelTree', function (RecursionHelper, PolicyStore) {
    return {
      templateUrl: 'scripts/directives/assignment-panel-tree/assignment-panel-tree.html',
      controller: function ($scope, $state) {
        $scope.paddingLeft = function(item) {
          return {'padding-left': numberOfParents(item) * 15 + 'px'}
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
        };

      },
      // isolate scope needed because we need to pass in "items" to recursively traverse each item
      scope: {
        items: '=',
        collapsedFolders: '=',
        goTo: '=',
        dragData: '=',
        itemIcon: '=',
        selected: '=',
        toggleFolder: '=',
        children: '='
      },
      restrict: 'EA',
      templateUrl: 'scripts/directives/assignment-panel-tree/assignment-panel-tree.html',
      compile: function(element) {
        return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn){

        });
      }
    };
  });
