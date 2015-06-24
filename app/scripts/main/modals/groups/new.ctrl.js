angular.module('policyEngine').controller('NewGroupCtrl', function ($scope, PolicyActions) {
 $scope.types = {};
 $scope.itemList =[];
 $scope.click = 1;
 $scope.conditions = [];
 $scope.descriptions =true;
 $scope.options = false;
 $scope.none=true;
  $scope.group = {
    name: "New Group",
    postureName: {
                name: "None"
                 },
    pools: []
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

   $scope.addPosture =function() {
    $scope.none = false;
     if($scope.click == '1') {
      $scope.descriptions = false;
      $scope.options = true;
      $scope.click++;
     }
     else if ($scope.click == '2' || $scope.click == '3'){
       $scope.options= true;
       $scope.descriptions = true;
       $scope.conditions.push({
       	name: $scope.group.itemsuper.name,
       	value: $scope.group.item1
       });
       if($scope.click == '3') {
       $scope.options= false;
       }
       $scope.click++;
     }
   };

   $scope.deleteCondition = function(posture) {
   }

});
