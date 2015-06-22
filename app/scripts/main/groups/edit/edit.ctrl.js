angular.module('policyEngine').controller('GroupsEditCtrl',
  function ($scope, $modal, $stateParams, PolicyStore, PolicyActions) {

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

    $scope.saveGroup = function () {
      PolicyActions.UpdateGroup($scope.group);
    };

    $scope.$watchGroup(['$routeChangeSuccess', function () {
      return PolicyStore.Groups.all();
    }], function () {
      $scope.group = angular.copy(PolicyStore.Groups.find({id: $stateParams.groupId}));
    });

    // Mock data for the Services Provided and Services Consumed tables
    var _services = PolicyStore.Services.all.bind(PolicyStore.Services);
    $scope.servicesProvided = _services().slice(0, 2);
    $scope.servicesConsumed = _services().slice(2, 4);
    $scope.ASSIGNMENT_ID = '76fd2c6f-9730-4e57-bf9a-4e294eaad3fc';

  }
);
