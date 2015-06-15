angular.module('policyEngine').controller('GroupsEditCtrl',
  function($scope, $modal, $stateParams, PolicyStore) {
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
      return _.filter(PolicyStore.Groups.all(), function(group) {
        return group.id == $stateParams.groupId;
      });
    };

    $scope.group = {};

    $scope.$watchGroup(['$routeChangeSuccess', function() { return PolicyStore.Groups.all(); }], function() {
      $scope.group = _.find(PolicyStore.Groups.all(), function(rule) {
        return rule.id === $stateParams.groupId;
      });
    });
  }
);
