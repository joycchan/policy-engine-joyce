angular.module('policyEngine').controller('NewGroupCtrl', function ($scope, groups, $state) {

  $scope.group = {
    name: "New Group"
  };

  $scope.pools = [
    '10.0.35.1/24',
    '10.0.36.1/24',
    'MAC pool#1',
    'MAC pool#2'
  ];

  $scope.ok = function () {
    $scope.service.group = groups.create($scope.group);
    $state.go('main.service');
  };

  $scope.cancel = function () {
    $state.go('main.service');
  };
});
