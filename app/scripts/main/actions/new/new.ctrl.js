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
      PolicyActions.CreateAction($scope.action);
      $state.go('main.actions');
    };

    $scope.cancel = function() {
      $state.go('main.actions');
    };

  }
);