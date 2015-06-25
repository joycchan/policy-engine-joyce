'use strict';

angular.module('policyEngine').controller('ServicesFilterCtrl',
  function ($scope, $stateParams, PolicyStore, PolicyActions) {

    $scope.filteredServices = [];

    var filterServices = function (allServices) {
      var filters = [{
          param: 'category',
          func: $scope.category
        }, {
          param: 'group',
          func: $scope.providerGroup
        }, {
          param: 'ruleSet',
          func: $scope.ruleSet
        }];

      var result = allServices;
      filters.forEach(function(filter) {
        if ($stateParams[filter.param]) {
          result = _.filter(result, function(service) {
            return filter.func(service).name === $stateParams[filter.param];
          });
        }
      });
      return result;
    };



    $scope.$watchGroup(['$routeChangeSuccess', function () {
      return PolicyStore.Services.all();
    }], function () {
      $scope.filteredServices = filterServices(PolicyStore.Services.all().slice());

      //Store a hash of which filters are in use so that service.html can display "Reset" links appropriately
      _.each(['category', 'group', 'ruleSet'], function (type) {
        $scope.filtered[type] = !!$stateParams[type];
      });
    });

  });
