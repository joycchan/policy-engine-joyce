angular.module('policyEngine').controller('ClassifiersEditCtrl',
  function($scope, $modal, $stateParams, Classifiers) {
    $scope.navTabLinks = [{
      'name': 'Settings',
      'uiSref': 'main.classifiersLibraryEdit.settings'
    }];
  }
);
