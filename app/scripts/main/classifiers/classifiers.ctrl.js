'use strict';

angular.module('policyEngine').controller('ClassifiersCtrl',
  function($scope, PolicyStore) {

    $scope.search = {'name': ''};

    $scope.selected = {
      classifier: null
    };

    $scope.classifiersList = PolicyStore.Classifiers.all.bind(PolicyStore.Classifiers);

    $scope.selectClassifier = function(classifier) {
      $scope.selected.classifier = classifier;
    };

    $scope.isClassifierSelected = function(classifier) {
      return $scope.selected.classifier === classifier;
    };

  }
);
