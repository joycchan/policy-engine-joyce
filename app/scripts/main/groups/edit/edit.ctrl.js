angular.module('policyEngine').controller('GroupsEditCtrl',
  function($scope, $modal, $stateParams, groups) {
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
      return _.filter(groups.list(), function(group) {
        return group.id == $stateParams.groupId;
      });
    };

  }
);
