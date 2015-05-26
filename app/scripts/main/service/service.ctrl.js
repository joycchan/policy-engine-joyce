'use strict';

angular.module('policyEngine').controller('ServiceCtrl',
   function($scope, $state) {

        $scope.state = {
            groupChoice: 'new',
            ruleSetChoice: 'new'
        };

        $scope.groupName = "New Group";
        $scope.service = {};

        $scope.accessGroup = function() {
            $state.go('main.service.group.' + $scope.state.groupChoice);
        };

        $scope.accessRuleSet = function() {
            $state.go('main.service.contract.' + $scope.state.ruleSetChoice);
        };

        $scope.contractObj = [
            {name: "SQL Access", classifiers: "SQL-Port-1443", custom: "Default"},
            {name: "TrustSEC Access", classifiers: "TrustSEC SGACL", custom: "Default"},
            {name: "Overlay TEP", classifiers: "Overlay-TEP-Type-HWTEP", custom: "Default"},
            {name: "Overlay Encap", classifiers: "Overlay-Encap-Type-VXLAN", custom: "Default"},
            {name: "HTTP Access", classifiers: "TCP-80 Default", custom: "Default"},
        ];

        $scope.existingContractSelection = function(selectedContract){
            $scope.service.ruleSet = selectedContract;
            $scope.service.name += ':' + selectedContract.name;
            $state.go('main.service.meta');
        };
        $scope.existingGroupSelection = function(selectedGroup){
            $scope.service.group = selectedGroup;
            $scope.service.name = selectedGroup.name;
            $scope.service.name = selectedGroup.name;
            $state.go('main.service.contract.choose');
        };

        $scope.createService = function() {
          $scope.services.push($scope.service);
            $state.go('main.services');
        };

       $scope.nameSelectedGroup = null;
       $scope.setSelected = function(nameSelectedGroup) {
           $scope.nameSelectedGroup = nameSelectedGroup;
           console.log(nameSelectedGroup);
       }

       $scope.namesSelectedRuleSet = null;
       $scope.setSelectedRuleSet = function(namesSelectedRuleSet) {
           $scope.namesSelectedRuleSet = namesSelectedRuleSet;
           console.log(namesSelectedRuleSet);
       }

       $scope.nwContext = true;
       $scope.toggleContext = function() {
           $scope.nwContext = $scope.nwContext === false ? true: false;
       };

    }
);
