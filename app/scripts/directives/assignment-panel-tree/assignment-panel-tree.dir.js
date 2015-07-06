'use strict';

angular.module('policyEngine')
  .directive('assignmentPanelTree', function (RecursionHelper, PolicyStore, StoreHelpers) {
    return {
      templateUrl: 'scripts/directives/assignment-panel-tree/assignment-panel-tree.html',
      controller: function ($scope, $state) {
        $scope.paddingLeft = function(item) {
          var numberOfParents = StoreHelpers.numberOfParents($scope.title + 's', item, 0);
          return {'padding-left': numberOfParents * 15 + 'px'}
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
        children: '=',
        title: '='
      },
      restrict: 'EA',
      templateUrl: 'scripts/directives/assignment-panel-tree/assignment-panel-tree.html',
      compile: function(element) {
        return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn){

        });
      }
    };
  });
