angular.module('policyEngine').controller('NewAssignmentCtrl', function ($scope, $state, $modalInstance, PolicyStore, PolicyActions) {

  $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);
  $scope.services = PolicyStore.Services.all.bind(PolicyStore.Services);

  $scope.type = 'groupCentric';

  $scope.selected;

  $scope.resetSelected = function() {
    $scope.selected = undefined;
  };

  $scope.selectGroup = function (item) {
    if ($scope.type === 'groupCentric') {
      $scope.selected = item;
    }
  };

  $scope.selectService = function (service) {
    if ($scope.type === 'serviceCentric') {
      $scope.selected = service;
    }
  };

  $scope.isSelected = function (item) {
    return item === $scope.selected;
  };

  $scope.ok = function () {
    if ($scope.selected) {
      var assignment = PolicyActions.CreateAssignment({
        item: $scope.selected,
        type: $scope.type,
        collection: []
      });
      $state.go('main.assignment.' + $scope.type, {assignmentId: assignment.id});
      $modalInstance.close();
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
