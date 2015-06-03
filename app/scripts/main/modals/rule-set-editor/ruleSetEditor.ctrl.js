angular.module('policyEngine').controller('RuleSetEditorCtrl', 
  function ($scope, $modalInstance, ruleSets) {

  // $scope.selected;

  // $scope.selectRuleSet = function (selectedRuleSet) {
  //   $scope.selected = selectedRuleSet;
  // };

  $scope.existingRuleSets = ruleSets.list;

  $scope.ok = function () {
    $modalInstance.close($scope.selected);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.existingClassifiers = [
    'SQL-port-1443',
    'TrustSEC SGACL',
    'Overlay-TEP-Type-HWTEP',
    'Overlap-Encap-TypeVX-LAN',
    'tcp-80',
    'tcp-0',
    'udp-80'
  ];

  $scope.existingActions = [
    'Allow', 'Deny', 'Redirect', 'Chain'
  ];

  $scope.ruleSets = [
    {'classifiers': [], 'actions': []}
  ];


  // on drop
    // get index of row dropped upon
    // push an object/string to either classifiers/actions array of that row


});
