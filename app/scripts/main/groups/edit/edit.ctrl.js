angular.module('policyEngine').controller('GroupsEditCtrl',
  function($scope, $modal, $stateParams, Groups, Modals) {
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

    $scope.rulesList = function() {
      return _.filter(Groups.list(), function(group) {
        return group.id == $stateParams.groupId;
      });
    };

    $scope.ruleset =
    {
      name: Groups.getEdit().name,
      description: Groups.getEdit().description,
      origin: Groups.getEdit().origin
    }
  }
);
