angular.module('policyEngine').controller('NewGroupCtrl', function ($scope, $modalInstance, groups) {

  $scope.group = {
    name: "New Group",
    enabled: false
  };

  $scope.subnets = [
    'WebServer-Subnet',
    'AppServer Subnet'
  ];

  $scope.l2Contexts = [
    'VXLAN-ID-1',
    'VXLAN-ID-2',
    'VLAN-ID-1',
    'VLAN-ID-2'
  ];

  $scope.l3Contexts = [
    'Router-ID-1',
    'Router-ID-2'
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
