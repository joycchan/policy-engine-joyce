'use strict';

angular.module('policyEngine')
  .directive('selectPools', function () {
    return {
      templateUrl: 'scripts/directives/select-pools/select-pools.html',
      controller: function ($scope, PolicyStore) {

        $scope.pools = angular.copy(PolicyStore.EndpointPools.all());

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
