'use strict';

angular.module('policyEngine').controller('ServiceCtrl',
    function($scope, $state) {

        $scope.state = {
            groupChoice: 'new',
            ruleSetChoice: 'new'
        };

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
        ];
        $scope.groupObj = [
            {name: "Web Server East Cost", origin: "ISE (Active Directory)"},
            {name: "Web Server East Cost", origin: "ISE (Active Directory)"},
            {name: "Database Fast", origin: "VMware vCenter"},
            {name: "Database Slow", origin: "VMware vCenter"},
        ];

        $scope.existingContractSelection = function(selectedContract){
            $scope.service.ruleSet = selectedContract;
            $state.go('main.service.meta');
        };
        $scope.existingGroupSelection = function(selectedGroup){
            $scope.service.group = selectedGroup;
            $state.go('main.service.contract.choose');
        };

        $scope.createService = function() {
          $scope.services.push($scope.service);
            $state.go('main.services');
        };
    }
);
