'use strict';

angular.module('policyEngine').controller('ServiceCtrl',
    function($scope,$state) {
        $scope.existingContract = "";
        $scope.existingGroup = "";

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
            $scope.existingContract = selectedContract;
        };
        $scope.existingGroupSelection = function(selectedGroup){
            $scope.existingGroup = selectedGroup;
        };
        $scope.gotoGroup = function(grp){
            $state.go("main.service.group." + grp);
        };

    }
);
