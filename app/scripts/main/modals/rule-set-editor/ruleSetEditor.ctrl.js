angular.module('policyEngine').controller('RuleSetEditorCtrl', 
  function ($scope, $modalInstance, ruleSets, Actions, Classifiers, $stateParams) {

  $scope.existingRuleSets = ruleSets.list;

  $scope.ok = function () {
    $modalInstance.close($scope.selected);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.existingClassifiers = Classifiers.list;

  $scope.existingActions = Actions.list;

  $scope.ruleSets = function() {
    return _.filter(ruleSets.list(), function(rule) {
      return rule.id == $stateParams.ruleId;
    });
  };



  $scope.onDragComplete = function(data,evt){
    // console.log("drag success, data:", data);
  }

  var isExisting = function(list, newItem) {
    return _.any(list, function(item) {
      return item === newItem;
    });
  }

  $scope.onDropComplete = function(data,index){
    console.log("drop success, data:", data);
    console.log("index", index);
    if (data.dataType === 'classifier') {
      if (!isExisting($scope.ruleSets()[index].classifiers, data.name)) {
        $scope.ruleSets()[index].classifiers.push(data.name);
      }
    } else {
      if (!isExisting($scope.ruleSets()[index].actions, data.name)) {
        $scope.ruleSets()[index].actions.push(data.name);
      }
    }
  }

  $scope.decorateData = function(data, dataType) {
    return _.extend(data, {'dataType': dataType});
  };


});
