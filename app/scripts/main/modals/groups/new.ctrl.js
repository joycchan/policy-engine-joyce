angular.module('policyEngine').controller('NewGroupCtrl', function ($scope, PolicyActions, $state) {

  $scope.group = {
    name: "New Group",
    pools: []
  };

  $scope.pools = [
    '10.0.35.1/24',
    '10.0.36.1/24',
    '10.4.28.1/24',
    '10.4.30.1/24',
    '10.20.101.1/24',
    '10.20.102.1/24',
    '10.20.102.2/24',
    '10.30.0.1/24',
    '10.30.0.2/24',
    '10.30.0.3/24'
  ];

  $scope.poolsExpanded = false;

  $scope.removePool = function(pool) {
    _.remove($scope.group.pools, function(p) {
      return p === pool;
    });
  };

  $scope.poolSelected = function(pool) {
    return _.includes($scope.group.pools, pool);
  };

  $scope.togglePool = function(pool) {
    if($scope.poolSelected(pool)) {
      $scope.removePool(pool);
    } else {
      $scope.group.pools.push(pool);
    }
  };

  $scope.ok = function () {
    $scope.service.group = PolicyActions.CreateGroup($scope.group);
    $state.go('main.service');
  };

  $scope.cancel = function () {
    $state.go('main.service');
  };
});
