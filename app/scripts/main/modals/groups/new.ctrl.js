angular.module('policyEngine').controller('NewGroupCtrl', function ($scope, PolicyActions) {

  $scope.group = {
    name: "New Group",
    description: '',
    endpointPools: []
  };

  $scope.create = function () {
    var group = PolicyActions.CreateGroup($scope.group);
    $scope.createGroup(group);
  };
});
