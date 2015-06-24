'use strict';

angular.module('policyEngine')
  .directive('customClassifier', function (PolicyActions, PolicyStore) {
    return {
      templateUrl: 'scripts/directives/custom-classifier/custom-classifier.html',
      controller: function ($scope) {

        $scope.protocols = [
          {name: 'TCP', value: 'TCP'},
          {name: 'UDP', value: 'UDP'},
          {name: 'TCP & UDP', value: 'TCP,UDP'}
        ];

        // this function sets the value of the "value" key to be that of the "name" key of each object
        // so that it may be ng-repeated over as option elements
        $scope.categories = _.map(angular.copy(PolicyStore.Categories.all.bind(PolicyStore.Categories)()), function(category) {
          category.value = category.name;
          return category;
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
