angular.module('policyEngine').controller('NewGroupCtrl', function ($scope, $modalInstance, groups) {

  $scope.group = {
    name: "New Group",
    enabled: false
  };

  $scope.toggleContext = function () {
    $scope.group.enabled = !$scope.group.enabled;
  };

  $scope.ok = function () {
    groups.create($scope.group);
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
