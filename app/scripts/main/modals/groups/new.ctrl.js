<<<<<<< HEAD
angular.module('policyEngine').controller('NewGroupCtrl', function ($scope, Groups, $state, $modalInstance, saveEditGroup) {

  $scope.saveEditGroup = saveEditGroup;
=======
angular.module('policyEngine').controller('NewGroupCtrl', function ($scope, Groups) {
>>>>>>> develop

  $scope.group = {
    name: "New Group",
    pools: []
  };

  $scope.create = function () {
    var group = Groups.create($scope.group);
    $scope.createGroup(group);
  };

  $scope.save = function(saveEditGroup) {
    $modalInstance.close($scope.saveEditGroup);
  };
});
