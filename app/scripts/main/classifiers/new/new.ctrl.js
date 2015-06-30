angular.module('policyEngine').controller('ClassifierNewCtrl',
  function ($scope, $stateParams, PolicyStore, PolicyActions, $state) {

    $scope.classifier = {
      'name': 'New Custom Classifier',
      'custom': true
    };

    $scope.create = function () {
      if ($scope.isCreateEnabled()) {
        PolicyActions.CreateClassifier($scope.classifier);
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
