'use strict';

angular.module('policyEngine').controller('ServicesFilterCtrl',
  function ($scope, $stateParams, Services) {

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

    $scope.$watchGroup(['$routeChangeSuccess', function () {
      return Services.list();
    }], function () {
      $scope.filteredServices = filterServices(Services.list());
      //Store a hash of which filters are in use so that service.html can display "Reset" links appropriately
      _.each(['category', 'group', 'ruleSet'], function (type) {
        $scope.filtered[type] = !!$stateParams[type];
      });
    });

  });
