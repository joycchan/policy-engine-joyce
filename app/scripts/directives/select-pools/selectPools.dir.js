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
          return $scope.group.pools.length ? 'Add more pools' : 'Add pools';
        };

        $scope.poolsExpanded = false;

        var setPools = function () {
          $scope.group.pools = _.filter($scope.pools, 'enabled');
        };

        $scope.toggleDropdown = function () {
          setPools();
          $scope.poolsExpanded = !$scope.poolsExpanded;
        };

        $scope.removePool = function (pool) {
          pool.enabled = false;
          setPools();
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
