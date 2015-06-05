angular.module('policyEngine').controller('RuleSetEditorCtrl', 
  function ($scope, $modalInstance, ruleSets, Actions, Classifiers, $stateParams, selectedRuleset) {

  // $scope.existingRuleSets = ruleSets.list;

  $scope.ok = function () {
    $modalInstance.close($scope.selected);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.existingClassifiers = Classifiers.list;

  $scope.existingActions = Actions.list;

  // $scope.selectedRuleset = function() {
  //   return _.filter(ruleSets.list(), function(rule) {
  //     return rule.id == $stateParams.ruleId;
  //   });
  // };

  $scope.deleteRuleset = function() {

  };

  $scope.onDragComplete = function(data,evt){
    // console.log("drag success, data:", data);
  }

  var isExistingRuleset = function(list, newItem) {
    return _.any(list, function(item) {
      return item === newItem;
    });
  }

  $scope.onDropComplete = function(data,index){
    if (data.dataType === 'classifier') {
      if (!isExistingRuleset($scope.selectedRuleset()[index].classifiers, data.name) && $scope.editModeHash[index]) {
        $scope.selectedRuleset()[index].classifiers.push(data.name);
      }
    } else {
      if (!isExistingRuleset($scope.selectedRuleset()[index].actions, data.name) && $scope.editModeHash[index]) {
        $scope.selectedRuleset()[index].actions.push(data.name);
      }
    }
  }

  $scope.decorateData = function(data, dataType) {
    return _.extend(data, {'dataType': dataType});
  };

  $scope.editModeHash = {
     // setting state for dev purposes
    0: true
    // ,
  };

  $scope.toggleEditRuleset = function(index) {
     $scope.editModeHash[index] = !$scope.editModeHash[index];
    console.log("$scope.editModeHash", $scope.editModeHash);
  };

  $scope.isInEditModeForAnyRule = function() {
    return _.any($scope.editModeHash, function(index) {
      return index === true;
    });
  };

  // to do
    // allow user to delete rule, upon hover of table row + click on X
    // allow user to add new rule, upon hover of bottom of table + click
    // allow user to delte individual classifiers and actions

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.selectedRuleset = selectedRuleset; // local from resolve
  // console.log("$scope.selectedRuleset", $scope.selectedRuleset());
  // setTimeout(function() {
  //   console.log("$scope.selectedRuleset()", $scope.selectedRuleset;
  // }, 5000);

});
