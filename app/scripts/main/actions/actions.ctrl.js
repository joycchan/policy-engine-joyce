'use strict';

angular.module('policyEngine').controller('Actions',
  function($scope, $modal, Modals, Actions) {

    $scope.actionsList = Actions.list;

    $scope.deleteActions = Actions.delete;

    $scope.search = {name: ''};

    $scope.actionsListFilters = [
      {name: 'All Actions'},
      {name: 'Default'},
      {name: 'Custom'}
    ];

    $scope.filter = "All Actions";

    $scope.filterActionsListBy = function(name) {
      $scope.filter = name;

      if(name === 'Default')
      {
        $scope.actionsList = function() {return Actions.byCustom('Default')};
      }
      else if(name === 'Custom')
      {
        $scope.actionsList = function() {return Actions.byCustom('Custom')};
      }
      else {
        $scope.actionsList = function() {return Actions.byCustom('')};
      }
    };

    $scope.isActionsListFilterSelected = function(name) {
      return name === $scope.filter;
    };

  }
);
