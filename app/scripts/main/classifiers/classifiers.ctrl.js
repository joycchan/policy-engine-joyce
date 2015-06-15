'use strict';

angular.module('policyEngine').controller('ClassifiersCtrl',
  function($scope, Classifiers) {

    $scope.search = {'name': ''};

    $scope.selected = {
      categoryName: '',
      classifiersList: [],
      classifier: null
    };

    $scope.classifiersList = Classifiers.list;

    $scope.categoryNames = [
      'Business and Productivity',
      'Backup and Storage',
      'Tools',
      'Database',
      'Email',
      'Internet Security'
    ];

    $scope.classifierCategories = function() {
      return _.groupBy($scope.classifiersList(), function(classifier) {
        return classifier.category;
      });
    };

    $scope.selectCategory = function(categoryName) {
      $scope.selected.categoryName = categoryName;
      $scope.selected.classifiersList = $scope.classifierCategories()[categoryName];
      // reset selected classifier
      $scope.selected.classifier = '';
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
