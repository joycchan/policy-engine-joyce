angular.module('policyEngine').controller('ClassifierNewCtrl',
  function ($scope, $stateParams, PolicyStore, PolicyActions, $state) {

    $scope.classifier = {
      name: 'New Custom Classifier',
    };

    $scope.create = function () {
      if ($scope.isCreateEnabled()) {
        var newClassifier = {
          name: $scope.classifier.name,
          description: $scope.classifier.description,
          port: parseInt($scope.classifier.port),
          protocols: $scope.classifier.protocols,
          custom: true
        }
        PolicyActions.CreateClassifier(newClassifier);
        $state.go('main.classifiers');
      }
    };

    $scope.cancel = function() {
      $state.go('main.classifiers');
    };

    $scope.isCreateEnabled = function() {
      return $scope.classifier.name && $scope.classifier.port && $scope.classifier.protocols;
    };

  }
);