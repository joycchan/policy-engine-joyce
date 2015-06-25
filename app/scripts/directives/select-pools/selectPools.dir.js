'use strict';

angular.module('policyEngine')
  .directive('selectPools', function () {
    return {
      templateUrl: 'scripts/directives/select-pools/select-pools.html',
      controller: function ($scope) {

        $scope.pools = [
          {name: '10.0.35.1/24'},
          {name: '10.0.36.1/24'},
          {name: '10.4.28.1/24'},
          {name: '10.4.30.1/24'},
          {name: '10.20.101.1/24'},
          {name: '10.20.102.1/24'},
          {name: '10.20.102.2/24'},
          {name: '10.30.0.1/24'},
          {name: '10.30.0.2/24'},
          {name: '10.30.0.3/24'}
        ];

        $scope.buttonText = function () {
          return $scope.group.endpointPools.length ? 'Add more pools' : 'Add pools';
        };

        $scope.poolsExpanded = false;

        $scope.open = function() {
          _.each($scope.pools, function(pool) {
            pool.enabled = _.includes($scope.group.endpointPools, pool.name);
          });
          $scope.poolsExpanded = true;
        };

        $scope.close = function() {
          $scope.group.endpointPools = _.pluck(_.filter($scope.pools, 'enabled'), 'name');
          $scope.poolsExpanded = false;
        };

        $scope.toggleDropdown = function () {
          $scope.poolsExpanded ? $scope.close() : $scope.open();
        };

        $scope.removePool = function (pool) {
          _.remove($scope.group.endpointPools, function(p) { return p === pool; });
        };

      },
      scope: {
        group: '=',
      },
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
