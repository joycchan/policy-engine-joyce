angular.module('policyEngine').controller('ActionEditCtrl',
  function ($scope, $stateParams, PolicyStore, PolicyActions, $state) {

    $scope.action = {};

    $scope.ok = function () {
      PolicyActions.UpdateAction($scope.action);
      $state.go('main.actions');
    };

    $scope.cancel = function() {
      $state.go('main.actions');
    };

    $scope.delete = function() {
      PolicyActions.DeleteAction($scope.action);
      $state.go('main.actions');
    };

    $scope.$watchGroup(['$routeChangeSuccess', function () {
      return PolicyStore.Actions.all();
    }], function () {
      $scope.action = angular.copy(PolicyStore.Actions.find({id: $stateParams.actionId}));
    });

  }
);
