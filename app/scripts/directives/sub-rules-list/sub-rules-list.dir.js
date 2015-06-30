'use strict';

angular.module('policyEngine')
  .directive('subRulesList', function (StoreHelpers) {
    return {
      templateUrl: 'scripts/directives/sub-rules-list/sub-rules-list.html',
      controller: function ($scope) {},
      scope: {
        subRuleType: '=',
        toggleInnerModal: '=',
        title: '@',
        list: '=',
        filter: '=',
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
