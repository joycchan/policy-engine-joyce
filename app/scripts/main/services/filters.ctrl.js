'use strict';

angular.module('policyEngine').controller('ServicesFilterCtrl',
  function ($scope, $stateParams, Services) {

    $scope.$watchGroup(['$routeChangeSuccess', function () {
      return Services.list();
    }], function () {
      $scope.filteredServices = filterServices(Services.list());
      _.each(['category', 'group', 'ruleSet'], function (type) {
        $scope.filtered[type] = !!$stateParams[type];
      });
    });

    $scope.filteredServices = [];

    var filterServices = function (allServices) {
      var result = allServices;
      _.each(['category', 'group', 'ruleSet'], function (type) {
        if ($stateParams[type]) {
          result = _.filter(result, function (service) {
            return service[type].name === $stateParams[type];
          });
        }
      });
      return result;
    };

    $scope.removeFilter = function (filter) {
      delete $scope.filters[filter];
      filterServices();
    };

  });
