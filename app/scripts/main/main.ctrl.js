'use strict';

angular.module('policyEngine').controller('MainCtrl',
  function ($scope, $http) {
    var allocationId = 0;

    $scope.newAllocationId = function (type) {
      allocationId++;
      return allocationId.toString();
    };

    $scope.services = [];

    $scope.groups = [];

    $scope.allocations = [{
      type: 'consume',
      item: {
        name: 'Sales Team'
      },
      collection: [
        {
          "name": "SQL External Access",
          "group": "Database Group",
          "contract": "Canned Contract"
        },
        {
          "name": "Web A Basic Service",
          "group": "Web Servers East Coast",
          "contract": "Canned Contract"
        }
      ]
    }];

    $http.get('api/groups').success(function (data) {
      $scope.groups = data;
    });
  }
);