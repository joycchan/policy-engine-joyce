angular.module('policyEngine').controller('ExistingGroupCtrl', function ($scope, $state, PolicyStore) {

  $scope.selected;

  $scope.selectGroup = function (selectedGroup) {
    $scope.selected = selectedGroup;
 };

  $scope.groups = PolicyStore.Groups.all.bind(PolicyStore.Groups);

  $scope.ok = function () {
    $scope.service.group = $scope.selected;
    $state.go('main.service');
  };

  $scope.cancel = function () {
    $state.go('main.service');
  };
});
