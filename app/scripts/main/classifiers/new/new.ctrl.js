angular.module('policyEngine').controller('ClassifierNewCtrl',
  function ($scope, $stateParams, PolicyStore, PolicyActions, $state) {

    $scope.classifier = {
      name: 'New Custom Classifier',
      description: "",
      port: "",
      protocols: "",
      category: "",
    };

    $scope.create = function () {
      // PolicyActions.UpdateClassifier($scope.classifier);
      var newClassifier = {
        name: $scope.classifier.name,
        description: $scope.classifier.description,
        port: parseInt($scope.classifier.port),
        protocols: $scope.classifier.protocols.split(','),
        category: $scope.classifier.category
      }
      PolicyActions.CreateClassifier(newClassifier);

      var classifiersList = PolicyStore.Classifiers.all.bind(PolicyStore.Classifiers);
      console.log("classifiersList", classifiersList());

      $state.go('main.classifiers');
    };

    $scope.cancel = function() {
      $state.go('main.classifiers');
    };

  }
);
