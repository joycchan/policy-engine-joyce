angular.module('policyEngine').controller('ImportGroupCtrl',
  function ($scope, PolicyStore) {

    $scope.groups = PolicyStore.ImportableGroups.all.bind(PolicyStore.ImportableGroups);
    $scope.search = {name: ''};
    $scope.selected = [];
    $scope.isGroupSelected = function(group) {
      return _.where($scope.selected, {'id': group.id}).length > 0;
    }

    $scope.toggleSelect = function(group) {
      if ($scope.isGroupSelected(group)) {
        $scope.selected = _.reject($scope.selected, function(selectedGroup) {
          return selectedGroup.id === group.id;
        });
      } else {
        $scope.selected.push(group);
      }
    }

    $scope.selectAll = function() {
      _.each($scope.groups(), function(group) {
        $scope.selected.push(group);
      })
    };

    $scope.deselectAll = function() {
      $scope.selected = [];
    }

});
