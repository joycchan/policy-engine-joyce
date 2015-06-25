'use strict';

angular.module('policyEngine').controller('ClassifiersCtrl',
  function($scope, PolicyStore, ClassifierCategories) {

    $scope.search = {'name': ''};

    $scope.selected = {
      categoryName: '',
      classifiersList: [],
      classifier: null
    };

    $scope.classifiersList = PolicyStore.Classifiers.all.bind(PolicyStore.Classifiers);

    $scope.categoryNames = ClassifierCategories;

    $scope.classifierCategories = function() {
      return _.groupBy($scope.classifiersList(), function(classifier) {
        return classifier.category;
      });
    };

    $scope.selectCategory = function(categoryName) {
      $scope.selected.categoryName = categoryName;
      $scope.selected.classifiersList = $scope.classifierCategories()[categoryName];
      // reset selected classifier
      $scope.selected.classifier = null;
    };

    $scope.isCategorySelected = function(category) {
      return $scope.selected.categoryName === category;
    };

    $scope.selectClassifier = function(classifier) {
      $scope.selected.classifier = classifier;
    };

    $scope.isClassifierSelected = function(classifier) {
      return $scope.selected.classifier === classifier;
    };

  }
);
