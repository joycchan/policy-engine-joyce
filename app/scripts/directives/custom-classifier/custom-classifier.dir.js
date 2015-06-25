'use strict';

angular.module('policyEngine')
  .directive('customClassifier', function (PolicyActions, PolicyStore, ClassifierCategories) {
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

        // this function creates an array of objects to ng-repeat over
        // each object's "name" and "value" key are assigned the value of the category's name
        $scope.categories = _.map(ClassifierCategories, function(category) {
          return {"name": category, "value": category};
        });

      },
      scope: {
        classifier: '='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
