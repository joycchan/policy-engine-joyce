'use strict';

angular.module('policyEngine').controller('ServicesFilterCtrl',
  function ($scope, $stateParams, PolicyStore) {

    $scope.filteredServices = [];

    var filterServices = function (allServices) {
      var result = allServices.reverse(); //Show newest to oldest

      //refactor when categories are an object
      if ($stateParams['category']) {
        result = _.filter(result, function (service) {
          return service['category'].name === $stateParams['category'];
        });
      }

      if ($stateParams['group']) {
        result = _.filter(result, function (service) {
          return $scope.providerGroup(service).name === $stateParams['group'];
        });
      }

      if ($stateParams['ruleSet']) {
        result = _.filter(result, function (service) {
          return $scope.ruleSet(service).name === $stateParams['ruleSet'];
        });
      }

      return result;
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
