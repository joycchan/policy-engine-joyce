angular.module('policyEngine').controller('RuleSetEditorCtrl',
  function ($scope, $modalInstance, ruleSets, Actions, Classifiers, $stateParams, selectedRuleset) {

    $scope.classifiersFilter = ruleSets.classifiersFilter;

    $scope.selectedRuleset = selectedRuleset; // local from resolve
    console.log("$scope.selectedRuleset", $scope.selectedRuleset);

    $scope.existingClassifiers = Classifiers.list;

    $scope.existingActions = Actions.list;

    $scope.ok = function () {
      $modalInstance.close($scope.selectedRuleset);
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
        && !isExistingRuleset($scope.selectedRuleset.rules[index].classifiers, data.name)
        && $scope.editModeHash[index]) {

        $scope.selectedRuleset.rules[index].classifiers.push({"name": data.name});
      }
    };

    $scope.addAction = function (data, index) {
      if (data.dataType === 'action'
        && !isExistingRuleset($scope.selectedRuleset.rules[index].actions, data.name)
        && $scope.editModeHash[index]) {

        $scope.selectedRuleset.rules[index].actions.push({"name": data.name});
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

    $scope.search = {
      classifiers: {name:''},
      actions: {name:''}
    };

    $scope.addRuleSet = function() {
      // push an empty rule set object to $scope.selectedRuleset
      // set scope.editModeHash to true for the last item in the list so user can edit it

    };

    // to do
    // allow user to delete rule, upon hover of table row + click on X
    // allow user to add new rule, upon hover of bottom of table + click
    // allow user to delte individual classifiers and actions

  });
