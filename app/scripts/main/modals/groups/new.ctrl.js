angular.module('policyEngine').controller('NewGroupCtrl', function ($scope, PolicyActions) {
 $scope.types = {};
 $scope.itemList =[];
 $scope.conditions = [];
 $scope.options = true;
 $scope.add =false;
  $scope.group = {
    name: "New Group",
    description: '',
    endpointPools: []
  };
  $scope.create = function () {
    var group = PolicyActions.CreateGroup($scope.group);
    $scope.createGroup(group);
  };

  $scope.posture = [
  { name:'Device',
    values: ['Company Desktop','Company Phone','All Other Devices']
  },
  { name:'Location',
    values: ['On-site', 'Off-site(VPN)', 'Everywhere else' ]
  }
  ];

  $scope.changeData = function() {
    var value = _.filter($scope.posture, function (condition) {
       return condition.name === $scope.group.itemsuper.name
     });
        angular.forEach(value, function(value, key) {
           $scope.types = value.values;
           console.log($scope.types);
    });
  };

   $scope.onClick = function() {
    $scope.conditions.push({
        name: $scope.group.itemsuper.name,
        value: $scope.group.item1
    });
    $scope.add = true;
    $scope.options = false;
   };

   $scope.addPosture =function() {
    $scope.options = true;
   };

   $scope.deleteCondition = function(index) {
      $scope.conditions.splice(index, 1);
      if ($scope.conditions.length == '0') {
        $scope.options = true;
      }
   };

$scope.changeCallback = function() {
    $scope.option = false;
    if ($scope.enabled == true) {
      $scope.option = true;
    };
  };

});
