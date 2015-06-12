angular.module('policyEngine').controller('NewAssignmentCtrl', function ($scope, $state, Groups, Services, $modalInstance, assignments) {

  $scope.groups = Groups.list;
  $scope.services = Services.list;

  $scope.type = 'groupCentric';

  $scope.chooseGroup = function() {
    if($scope.type === 'serviceCentric') {
      $scope.selected = undefined;
      $scope.type = 'groupCentric';
    }
  };

  $scope.chooseService = function() {
    if($scope.type === 'groupCentric') {
      $scope.selected = undefined;
      $scope.type = 'serviceCentric';
    }
  };

  $scope.selected;

  $scope.selectGroup = function(item) {
    if ($scope.type === 'groupCentric') {
      $scope.selected = item;
    }
  };

  $scope.selectService = function(service) {
    if ($scope.type === 'serviceCentric') {
      $scope.selected = service;
    }
  };

  $scope.isSelected = function(item) {
    return item === $scope.selected;
  };

  $scope.ok = function () {
    if ($scope.selected) {
      var assignment = assignments.create($scope.type, $scope.selected)
      $state.go('main.assignment.' + $scope.type, {assignmentId: assignment.id});
      $modalInstance.close();
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
