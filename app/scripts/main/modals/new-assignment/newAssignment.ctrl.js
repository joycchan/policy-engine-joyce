angular.module('policyEngine').controller('NewAssignmentCtrl', function ($scope, $state, Groups, Services, $modalInstance, assignments) {

  $scope.groups = Groups.list;
  $scope.services = Services.list;

  $scope.type = 'group';

  $scope.chooseGroup = function() {
    if($scope.type === 'service') {
      $scope.selected = undefined;
      $scope.type = 'group';
    }
  };

  $scope.chooseService = function() {
    if($scope.type === 'group') {
      $scope.selected = undefined;
      $scope.type = 'service';
    }
  };

  $scope.selected;

  $scope.selectGroup = function(item) {
    if ($scope.type === 'group') {
      $scope.selected = item;
    }
  };

  $scope.selectService = function(service) {
    if ($scope.type === 'service') {
      $scope.selected = service;
    }
  };

  $scope.isSelected = function(item) {
    return item === $scope.selected;
  };

  $scope.ok = function () {
    if ($scope.selected) {
      var x = $scope.type === 'group' ? 'consume' : 'provide';
      var assignment = assignments.create(x, $scope.selected)
      $state.go('main.assignment.' + x, {assignmentId: assignment.id});
      $modalInstance.close();
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
