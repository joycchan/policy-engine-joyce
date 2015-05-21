'use strict';

angular.module('policyEngine').controller('MainCtrl',
  function ($scope, $http) {
    var allocationId = 0;

    $scope.newAllocation = function (type, item) {
      allocationId++;
      var allocation = {
        id: allocationId,
        type: type,
        item: item,
        collection: []
      };
      $scope.allocations.push(allocation);

      return allocation;
    };

    $scope.services = [{
      name: 'Sample Service',
      group: {
        name: 'Sample Service Group'
      } ,
      ruleSet: {
        name: 'Sample Rule Set'
      }
    }];

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