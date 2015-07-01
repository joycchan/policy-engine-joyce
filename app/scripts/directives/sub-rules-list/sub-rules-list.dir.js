'use strict';

angular.module('policyEngine')
  .directive('subRulesList', function (StoreHelpers) {
    return {
      templateUrl: 'scripts/directives/sub-rules-list/sub-rules-list.html',
      controller: function ($scope) {

        $scope.isDraggable = function () {
          return _.any($scope.editModeHash, function (index) {
            return index === true;
          });
        };

      },
      scope: {
        subRuleType: '=',
        toggleInnerModal: '=',
        title: '@',
        list: '=',
        filter: '=',
        editModeHash: '=',
        draggedSubRule: '='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
