'use strict';

angular.module('policyEngine')
  .directive('notifications', function ($state) {
    return {
      templateUrl: 'scripts/directives/notifications/notifications.html',
      restrict: 'E',
      controller: function($scope, PolicyStore, PolicyActions) {

        $scope.errors = function() {
          return PolicyStore.Errors.where({dismissed: false});
        };

        $scope.dismiss = function(error) {
          return PolicyActions.DismissError(error.id);
        };


      },
    };
  });
