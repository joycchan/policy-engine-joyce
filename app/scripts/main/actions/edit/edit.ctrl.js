angular.module('policyEngine').controller('ActionsEditCtrl',
  function($scope, $modal, $stateParams, Classifiers) {
    $scope.navTabLinks = [{
      'name': 'Settings',
      'uiSref': 'main.actionsLibraryEdit.settings'
    }];
  }
);
