angular.module('policyEngine').controller('NewGroupCtrl', function ($scope, PolicyActions) {
 $scope.types = {};
 $scope.itemList =[];
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
          console.log($scope.group.itemsuper);

          if($scope.group.itemsuper.name == "Device") {
              $scope.types = $scope.device;
          } else if($scope.group.itemsuper.name == "Location") {
              $scope.types = $scope.location;
          }
      };

   $scope.description =[''];

   $scope.addPosture =function() {
     $scope.description.push({});
   };

});
