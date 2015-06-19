angular.module('policyEngine').controller('ImportGroupCtrl',
  function ($scope, PolicyStore) {

    $scope.groups = PolicyStore.ImportableGroups.all.bind(PolicyStore.ImportableGroups);
    $scope.search = {name: ''};
    $scope.selectedGroups = [];

    $scope.isGroupSelected = function(group) {
      return _.where($scope.selectedGroups, {'id': group.id}).length > 0;
    }

    $scope.toggle = function(group) {
      if ($scope.isGroupSelected(group)) {
        $scope.selectedGroups = _.reject($scope.selectedGroups, function(selectedGroup) {
          return selectedGroup.id === group.id;
        });
      } else {
        $scope.selectedGroups.push(group);
      }
    }

    $scope.selectAll = function() {
      $scope.selectedGroups = $scope.groups();
    };

    $scope.deselectAll = function() {
      $scope.selectedGroups = [];
    };

});
