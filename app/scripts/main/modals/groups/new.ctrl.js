angular.module('policyEngine').controller('NewGroupCtrl', function ($scope, $modalInstance, groups) {

  $scope.group = {
    name: "New Group",
    enabled: false
  };

  $scope.pools = [
    '10.0.35.1/24',
    '10.0.36.1/24',
    'MAC pool#1',
    'MAC pool#2'
  ];

  $scope.toggleContext = function () {
    $scope.group.enabled = !$scope.group.enabled;
  };

  $scope.ok = function () {
    var group = groups.create($scope.group);
    $modalInstance.close(group);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
