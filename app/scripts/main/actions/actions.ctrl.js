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
      action: 'table', // can be 'table' or 'text'
      isDisplayingActionTableTextField: function() {
        // assumption: default actions will not have key/value pairs to edit
        // whereas custom actions will
        // and the ui will only display this info if exists
        return !_.isUndefined($scope.selectedAction.data) && !_.isNull($scope.selectedAction.data);
      }
    };

    $scope.selectedActionDataAsString = ''; // textarea's ngModel can only be bound to strings

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
