'use strict';

angular.module('policyEngine').controller('ServicesFilterCtrl',
  function ($scope, $stateParams, PolicyStore) {

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

    $scope.getGroup = function(service) {
      return PolicyStore.Groups.where({id: service.group})[0];
    };

    $scope.$watchGroup(['$routeChangeSuccess', function () {
      return PolicyStore.Services.all();
    }], function () {
      $scope.filteredServices = filterServices(PolicyStore.Services.all());
      //Store a hash of which filters are in use so that service.html can display "Reset" links appropriately
      _.each(['category', 'group', 'ruleSet'], function (type) {
        $scope.filtered[type] = !!$stateParams[type];
      });
    });

  });
