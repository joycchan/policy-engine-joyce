'use strict';

angular.module('policyEngine').controller('ClassifiersLibrary',
  function($scope, $modal, Modals, Classifiers) {

    $scope.classifiersList = Classifiers.list;

    $scope.deleteClassifier = Classifiers.delete;

    $scope.search = {name: ''};

    $scope.classifiersListFilters = [
      {name: 'All Classifiers'},
      {name: 'Default'},
      {name: 'Custom'}
    ];

    $scope.filter = "All Classifiers";

    $scope.filterRulesListBy = function(name) {
      $scope.filter = name;

      if(name === 'Default')
      {
        $scope.classifiersList = function() {return Classifiers.byCustom('Default')};
      }
      else if(name === 'Custom')
      {
        $scope.classifiersList = function() {return Classifiers.byCustom('Custom')};
      }
      else {
        $scope.classifiersList = function() {return Classifiers.byCustom('')};
      }
    };

    $scope.isRulesListFilterSelected = function(name) {
      return name === $scope.filter;
    };

  }
);
