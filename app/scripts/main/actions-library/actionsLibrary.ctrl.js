'use strict';

angular.module('policyEngine').controller('ActionsLibrary',
  function($scope, $modal, Modals, Actions) {

    $scope.ActionsList = Actions.list;

    $scope.deleteActions = Actions.delete;

    $scope.search = {name: ''};

    $scope.ActionsListFilters = [
      {name: 'All Actions'},
      {name: 'Default'},
      {name: 'Custom'}
    ];

    $scope.filter = "All Actions";

    $scope.filterActionsListBy = function(name) {
      $scope.filter = name;

      if(name === 'Default')
      {
        $scope.ActionsList = function() {return Actions.byCustom('Default')};
      }
      else if(name === 'Custom')
      {
        $scope.ActionsList = function() {return Actions.byCustom('Custom')};
      }
      else {
        $scope.ActionsList = function() {return Actions.byCustom('')};
      }
    };

    $scope.isActionsListFilterSelected = function(name) {
      return name === $scope.filter;
    };

  }
);
