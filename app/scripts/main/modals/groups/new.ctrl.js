angular.module('policyEngine').controller('NewGroupCtrl', function ($scope, PolicyActions) {
 $scope.types = {};
 $scope.itemList =[];
 $scope.descriptions = false;
  $scope.group = {
    name: "New Group",
    pools: []
  };

  $scope.create = function () {
    var group = PolicyActions.CreateGroup($scope.group);
    $scope.createGroup(group);
  };

  $scope.posture = [
  { name:'Device'},
  { name:'Location'}
  ];

  $scope.device = [
    { name:'Company Desktop'},
    { name:'Company Phone'},
    { name:'All Other Devices'}
  ];

  $scope.location = [
      { name:'On-site'},
      { name:'Off-site(VPN)'},
      { name:'Everywhere else'}
  ];

  $scope.changeData = function() {
          if($scope.group.itemsuper.name == "Device") {
              $scope.types = $scope.device;
          } else if($scope.group.itemsuper.name == "Location") {
              $scope.types = $scope.location;
          }

      };

   $scope.description =[''];

   $scope.addPosture =function() {
     $scope.description.push({});
     $scope.descriptions =true;
     $scope.options = true;
     $scope.group.postureName = $scope.group.itemsuper;
      $scope.group.valueName = $scope.group.item1;
   };
   $scope.options= true;
   $scope.change = function () {
   if($scope.group.itemsuper != null && $scope.group.item1 != null)
     $scope.options = false;
     $scope.descriptions= true;
     $scope.group.postureName = $scope.group.itemsuper;
     $scope.group.valueName = $scope.group.item1;
   }

});
