angular.module('policyEngine').controller('ClassifierEditCtrl',
  function ($scope, $stateParams, PolicyStore, PolicyActions, $state) {

    $scope.classifier = {};

    $scope.ok = function () {
      PolicyActions.UpdateClassifier($scope.classifier);
      $state.go('main.classifiers');
    };

    $scope.cancel = function() {
      $state.go('main.classifiers');
    };

    $scope.delete = function() {
      PolicyActions.DeleteClassifier($scope.classifier.id);
      $state.go('main.classifiers');
    };

    $scope.$watchGroup(['$routeChangeSuccess', function () {
      return PolicyStore.Classifiers.all();
    }], function () {
      $scope.classifier = angular.copy(PolicyStore.Classifiers.find({id: $stateParams.classifierId}));
    });

  }
);
