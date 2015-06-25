'use strict';

angular.module('policyEngine').controller('Actions',
  function($scope, $modal, Modals, PolicyStore, $timeout) {

    // for dev purposes
    $timeout(function( ){
      $scope.selectAction(_.first(PolicyStore.Actions.all()));
    }, 500);

    $scope.actionsList = PolicyStore.Actions.all.bind(PolicyStore.Actions);

    $scope.search = {name: ''};

    $scope.selectedAction = {};

    $scope.selectAction = function(action) {
      $scope.selectedAction = action;
    };

    $scope.isActionSelected = function(action) {
      return $scope.selectedAction.id === action.id;
    };

    $scope.displayHash = {
      action: 'table', // can be 'table' or 'text'
      isDisplayingActionTableTextField: function() {
        // assumption: default actions will not have key/value pairs to edit
        // whereas custom actions will
        // and the ui will only display this info if exists
        return !_.isUndefined($scope.selectedAction.data) && !_.isNull($scope.selectedAction.data);
      }
    };

  }
);
