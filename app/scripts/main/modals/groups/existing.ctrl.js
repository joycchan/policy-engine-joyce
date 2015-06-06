angular.module('policyEngine').controller('ExistingGroupCtrl', function ($scope, $state, groups) {

  $scope.selected;

  $scope.selectGroup = function (selectedGroup) {
    $scope.selected = selectedGroup;
 };

  $scope.groups = groups.list;

  $scope.ok = function () {
    $scope.service.group = $scope.selected;
    $state.go('main.service');
  };

  $scope.cancel = function () {
    $state.go('main.service');
  };
});
