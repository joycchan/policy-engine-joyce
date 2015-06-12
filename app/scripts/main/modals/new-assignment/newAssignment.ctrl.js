angular.module('policyEngine').controller('NewAssignmentCtrl', function ($scope, $state, Groups, Services) {

  $scope.groups = Groups.list;
  $scope.services = Services.list;

  $scope.ok = function () {
    //$scope.service.group = Groups.create($scope.group);
    //$state.go('main.service');
  };

  $scope.cancel = function () {
    //$state.go('main.service');
  };
});
