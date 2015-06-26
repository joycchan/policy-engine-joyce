angular.module('policyEngine').controller('ActionsNewCtrl',
  function ($scope, $stateParams, PolicyStore, PolicyActions, $state) {

    $scope.action = {
      'name': 'New Custom Action',
      data: [{
        "name": "nameA",
        "value": "valueA"
      }]
    };

    $scope.create = function () {
      if ($scope.isCreateEnabled()) {
        PolicyActions.CreateAction($scope.action);
        $state.go('main.actions');
      }
    };

    $scope.cancel = function() {
      $state.go('main.actions');
    };

    $scope.isCreateEnabled = function() {
      return $scope.action.name && $scope.action.data;
    };

  }
);
