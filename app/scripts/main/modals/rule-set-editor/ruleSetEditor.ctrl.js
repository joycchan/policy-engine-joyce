angular.module('policyEngine').controller('RuleSetEditorCtrl',
  function ($scope, $modalInstance, ruleSets, Actions, Classifiers, $stateParams, selectedRuleset) {

    $scope.selectedRuleset = selectedRuleset; // local from resolve

    $scope.existingClassifiers = Classifiers.list;

    $scope.existingActions = Actions.list;

    $scope.ok = function () {
      $modalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    var isExistingRuleset = function (list, newItem) {
      return _.any(list, function (item) {
        return item === newItem;
      });
    }

    $scope.addClassifier = function (data, index) {
      if (data.dataType === 'classifier'
        && !isExistingRuleset($scope.selectedRuleset[index].classifiers, data.name)
        && $scope.editModeHash[index]) {

        $scope.selectedRuleset[index].classifiers.push(data.name);
      }
    };

    $scope.addAction = function (data, index) {
      if (data.dataType === 'action'
        && !isExistingRuleset($scope.selectedRuleset[index].actions, data.name)
        && $scope.editModeHash[index]) {

        $scope.selectedRuleset[index].actions.push(data.name);
      }
    };

    $scope.decorateData = function (data, dataType) {
      return _.extend(data, {'dataType': dataType});
    };

    $scope.editModeHash = {
      // setting state for dev purposes
      0: true
      // ,
    };

    $scope.toggleEditRuleset = function (index) {
      $scope.editModeHash[index] = !$scope.editModeHash[index];
    };

    $scope.isInEditModeForAnyRule = function () {
      return _.any($scope.editModeHash, function (index) {
        return index === true;
      });
    };

    // to do
    // allow user to delete rule, upon hover of table row + click on X
    // allow user to add new rule, upon hover of bottom of table + click
    // allow user to delte individual classifiers and actions

  });
