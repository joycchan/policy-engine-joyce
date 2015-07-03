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
        editModeHash: '='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        $('.listItemScroll').on('scroll', function() {
          var d = $('.listItemScrollEmpty').position().top
          $('.listItems').css('top', 150 + d);
        })
      }
    };
  });
