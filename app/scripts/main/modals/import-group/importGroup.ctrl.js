angular.module('policyEngine').controller('ImportGroupCtrl',
  function ($scope, PolicyStore, PolicyActions, $state) {

    $scope.groups = PolicyStore.ImportableGroups.all.bind(PolicyStore.ImportableGroups);
    $scope.search = {name: ''};
    $scope.selectedGroups = [];

    $scope.isGroupSelected = function(group) {
      return _.find($scope.selectedGroups, {'id': group.id});
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

    $scope.selectAllClass = function() {
      if ($scope.selectedGroups.length < $scope.groups().length) {
        return 'button--secondary';
      } else {
        return 'button--disabled';
      }
    };

    $scope.deselectAllClass = function() {
      if ($scope.selectedGroups.length > 0) {
        return 'button--secondary';
      } else {
        return 'button--disabled';
      }
    }

    $scope.importGroups = function(groups) {
      _.each(groups, function(group) {
        PolicyActions.ReceiveGroup(group);
      });
      $state.go('main.service.form');
    };

});
