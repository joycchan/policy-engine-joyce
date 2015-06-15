'use strict';

angular.module('policyEngine').controller('ClassifiersCtrl',
  function($scope, Classifiers) {

    $scope.search = {'name': ''};

    $scope.classifiersList = Classifiers.list;

    var _classifierCategories;

    $scope.classifierCategories = function() {
      return _classifierCategories;
    }

    var generateClassifierCategories = function() {
      _classifierCategories = _.groupBy($scope.classifiersList(), function(classifier) {
        return classifier.category;
      });
    }

    $scope.$watch(function() {
      return $scope.classifiersList();
    }, function() {
      generateClassifierCategories();

      // for dev purposes
        var category = $scope.classifierCategories()['Backup and Storage'];
        $scope.selectCategory('Backup and Storage', category);
        $scope.selectClassifier(_.first(category));
      //
    });

    $scope.isCategorySelected = function(category) {
      return $scope.selected.categoryName === category;
    }

    $scope.isClassifierSelected = function(classifier) {
      return $scope.selected.classifier === classifier;
    };

    $scope.selected = {
      categoryName: '',
      classifiersList: [],
      classifier: null
    }
    $scope.selectCategory = function(categoryName, classifiers) {
      $scope.selected.categoryName = categoryName;
      $scope.selected.classifiersList = classifiers;
    }

    $scope.selectClassifier = function(classifier) {
      $scope.selected.classifier = classifier;
    }

  }
);
