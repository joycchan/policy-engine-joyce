'use strict';

angular.module('policyEngine')
  .directive('customClassifier', function (PolicyActions, PolicyStore) {
    return {
      templateUrl: 'scripts/directives/custom-classifier/custom-classifier.html',
      controller: function ($scope) {

        $scope.protocols = [
          {name: 'TCP', value: 'TCP'},
          {name: 'UDP', value: 'UDP'},
          {name: 'TCP & UDP', value: 'TCP & UDP'},
          {name: 'IP', value: 'IP'},
          {name: 'HTTP', value: 'HTTP'}
        ];

      },
      scope: {
        classifier: '='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
