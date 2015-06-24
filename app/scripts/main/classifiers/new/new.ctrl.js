angular.module('policyEngine').controller('ClassifierNewCtrl',
  function ($scope, $stateParams, PolicyStore, PolicyActions, $state) {

    $scope.classifier = {
      name: 'New Custom Classifier',
      description: null,
      port: null,
      protocols: "",
      category: ""
    };
    // keep 'protocols' and 'category' as empty strings because in the custom-classifier directive,
    // option element placeholders depend on these values being empty strings

    $scope.create = function () {
      var newClassifier = {
        name: $scope.classifier.name,
        description: $scope.classifier.description,
        port: parseInt($scope.classifier.port),
        protocols: $scope.classifier.protocols.split(','),
        category: $scope.classifier.category
      }
      PolicyActions.CreateClassifier(newClassifier);
      $state.go('main.classifiers');
    };

    $scope.cancel = function() {
      $state.go('main.classifiers');
    };

    $scope.isCreateEnabled = function() {
      return $scope.classifier.name && $scope.classifier.port && $scope.classifier.protocols !== "" && $scope.classifier.category !== "";
    };

  }
);
