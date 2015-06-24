'use strict';

angular.module('policyEngine')
  .directive('customClassifier', function () {
    return {
      templateUrl: 'scripts/directives/custom-classifier/custom-classifier.html',
      controller: function ($scope) {

        $scope.protocols = [
          {name: 'TCP', value: 'TCP'},
          {name: 'UDP', value: 'UDP'},
          {name: 'TCP & UDP', value: 'TCP & UDP'},
        ];

        $scope.categories = [
          {name: 'Uncategorized', value: 'Uncategorized'},
        ];

        $scope.classifier = {
          name: 'New Custom Classifier',
          description: null,
          port: null,
          protocol: null,
          category: _.first($scope.categories).name
        };

        $scope.createClassifier = function() {
          console.log("$scope.classifier", $scope.classifier);
        }

      },
      scope: {
        // classifier: '='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
