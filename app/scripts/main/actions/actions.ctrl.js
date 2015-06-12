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

    $scope.displayHash = {
      isEditModeEnabled: true, // true for dev purposes, should be false
      action: 'table', // can be 'table' or 'text'
    };

    $scope.toggleEditMode = function() {
      $scope.displayHash.isEditModeEnabled = !$scope.displayHash.isEditModeEnabled;
    };

    $scope.selectedActionDataAsString = '';

    var generateSelectedActionDataAsString = function() {
      if($scope.selectedAction && $scope.selectedAction.data) {
        var selectedActionData = _.map($scope.selectedAction.data, function(data) {
          return _.omit(data, '$$hashKey');
        })
        $scope.selectedActionDataAsString = JSON.stringify(selectedActionData);
      } else {
        $scope.selectedActionDataAsString = '';
      }
    };

    $scope.$watch('selectedAction', function() {
      generateSelectedActionDataAsString();
    });


  }
);
