angular.module('policyEngine').controller('NewCtrl', function ($scope, $state) {
  $scope.createGroup = function(group) {
    $state.go('main.groups');
  };

  $scope.cancelGroup = function() {
    $state.go('main.groups');
  };

});
