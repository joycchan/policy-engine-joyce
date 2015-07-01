angular.module('policyEngine').controller('NewGroupCtrl', function ($scope, PolicyActions) {

  $scope.group = {
    name: "New Group",
    description: '',
    endpointPools: []
  };

  $scope.create = function () {
    $scope.createGroup(PolicyActions.CreateGroup($scope.group));
  };
});
