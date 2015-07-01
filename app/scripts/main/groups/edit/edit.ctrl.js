angular.module('policyEngine').controller('GroupsEditCtrl',
  function ($scope, $modal, $stateParams, PolicyStore, PolicyActions, StoreHelpers) {

    $scope.navTabLinks = [{
      'name': 'Settings',
      'uiSref': 'main.groupsEdit.settings'
    }, {
      'name': 'Services Provided',
      'uiSref': 'main.groupsEdit.servicesProvided'
    }, {
      'name': 'Services Consumed',
      'uiSref': 'main.groupsEdit.services'
    }];

    $scope.group = {};
    $scope.servicesProvided = [];
    $scope.servicesConsumed = [];

    $scope.saveGroup = function () {
      PolicyActions.UpdateGroup($scope.group);
    };

    $scope.$watchGroup(['$routeChangeSuccess', function () {
      return PolicyStore.Groups.all();
    }], function () {
      $scope.group = angular.copy(PolicyStore.Groups.find({id: $stateParams.groupId}));
      $scope.servicesProvided = StoreHelpers.servicesProvided($scope.group);
      $scope.servicesConsumed = StoreHelpers.servicesConsumed($scope.group);
    });

  }
);
