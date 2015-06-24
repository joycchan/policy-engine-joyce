'use strict';

angular.module('policyEngine')
  .directive('customClassifier', function (PolicyActions, PolicyStore) {
    return {
      templateUrl: 'scripts/directives/custom-classifier/custom-classifier.html',
      controller: function ($scope) {

        $scope.protocols = [
          {name: 'TCP', value: 'TCP'},
          {name: 'UDP', value: 'UDP'},
          {name: 'TCP & UDP', value: 'TCP,UDP'},
        ];

        $scope.categories = [
          {name: 'Uncategorized', value: 'Uncategorized'},
        ];

        // $scope.classifier = {
        //   name: 'New Custom Classifier',
        //   description: null,
        //   port: null,
        //   protocols: "",
        //   category: _.first($scope.categories).name
        // };

        $scope.createClassifier = function() {
          console.log("$scope.classifier", $scope.classifier);
          var newClassifier = {
            name: $scope.classifier.name,
            description: $scope.classifier.description,
            port: parseInt($scope.classifier.port),
            protocols: $scope.classifier.protocols.split(','),
            category: $scope.classifier.category
          }
          PolicyActions.CreateClassifier(newClassifier);

          var classifiersList = PolicyStore.Classifiers.all.bind(PolicyStore.Classifiers);
          console.log("classifiersList", classifiersList());
        }

      },
      scope: {
        classifier: '='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
