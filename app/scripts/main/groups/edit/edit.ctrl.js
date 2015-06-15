angular.module('policyEngine').controller('GroupsEditCtrl',
  function($scope, $modal, $stateParams, Groups) {
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

    $scope.group = {};

    $scope.$watchGroup(['$routeChangeSuccess', function() { return Groups.list(); }], function() {
      $scope.group = _.find(Groups.list(), function(rule) {
        return rule.id === $stateParams.groupId;
      });
    });
  }
);
