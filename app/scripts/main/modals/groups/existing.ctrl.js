angular.module('policyEngine').controller('ExistingGroupCtrl', function ($scope, $modalInstance, groups) {

  $scope.selected;

  $scope.selectGroup = function (selectedGroup) {
    $scope.selected = selectedGroup;
 };

  $scope.groups = groups.list;

  $scope.ok = function () {
    $modalInstance.close($scope.selected);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
