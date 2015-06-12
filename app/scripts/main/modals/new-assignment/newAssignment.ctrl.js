angular.module('policyEngine').controller('NewAssignmentCtrl', function ($scope, $state, Groups, Services, $modalInstance) {

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

    //$scope.service.group = Groups.create($scope.group);
    //$state.go('main.service');
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
