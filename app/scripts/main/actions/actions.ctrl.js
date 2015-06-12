'use strict';

angular.module('policyEngine').controller('Actions',
  function($scope, $modal, Modals, Actions, $timeout) {

    // for dev purposes
    $timeout(function( ){
      $scope.selectAction(_.first(Actions.list()));
    }, 500);

    $scope.actionsList = Actions.list;

    $scope.search = {name: ''};

    $scope.selectedAction = {};

    $scope.selectAction = function(action) {
      $scope.selectedAction = action;
    };

    $scope.isActionSelected = function(action) {
      return $scope.selectedAction.id === action.id;
    };

  }
);
