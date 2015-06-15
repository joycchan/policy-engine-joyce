
angular.module('policyEngine').controller('NewGroupCtrl', function ($scope, Groups) {


  $scope.group = {
    name: "New Group",
    pools: []
  };

  $scope.create = function () {
    var group = Groups.create($scope.group);
    $scope.createGroup(group);
  };
});
