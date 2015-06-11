angular.module('policyEngine').controller('customClassifierCtrl',
    function ($scope, $modalInstance, ruleSets, Actions, Classifiers, $stateParams, $compile){


        $scope.ok = function () {
            $modalInstance.close($scope.selected);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.protocol = {
            name: "customClassifier",
            options: []
        };

        $scope.options = [
            {name: 'TCP', value: 'TCP'},
            {name: 'UDP', value: 'UDP'},
            {name: 'TCP & UDP', value: 'T & U'},
            {name: 'Http', value: 'http'},
            {name: 'ip', value: 'ip'},
            {name: 'Trust SEC SGACL', value: 'trust'},
            {name: 'Overlay-TEP-Type', value: 'Tep'},
            {name: 'Overlay-Encap-Type', value: 'Encap'},
            {name: 'ip', value: 'ip'}
        ]

        $scope.port = [
            {name: 'VXLAN', value: 'VX'},
            {name: 'VLAN', value: 'V'},
            {name: 'Segment Routing', value: 'SG'},
            {name: 'MPLS', value: 'MP'},
            {name: 'MPLS Over GRE', value: 'MG'},
            {name: 'LISP', value: 'LIS'},
            {name: 'TEP', value: 'T'},
            {name: 'Encap', value: 'Enc'},
            {name: 'ipv6', value: 'ip6'}
        ]

        $scope.category = [
            {name: 'Uncategorized', value: 'Un'},
            {name: 'Categorized', value: 'C'},
            {name: 'Semi-Categorized', value: 'SC'},
            {name: 'Semi-UnCategorized', value: 'su'}
        ]



        $scope.customClassifier = function(){
            var td1 = "<td><select class='custom-select' ng-model='custom.classifier'><option>tcp</option><option>udp</option><option>tcp & udp</option><option>ip</option><option>http</option></select></td>";
            var td2 = "<td><input type='text' class='form-control port-number' ng-model='custom.port' placeholder='Port Number'/></td>";
            var td3 = "<td><select class='custom-select' ng-model='custom.action'><option>Allow</option><option>Deny</option><option>Choose from</option><option>Action Library</option></select></td>";
            var td4 = "<td ng-model='custom.category'>Custom</td>";
            var html = "<tr ng-model='custom' id='customRow'>"+(td1 + td2 + td3 + td4)+"</tr>";
            var compiledHtml = $compile(html)($scope);
            angular.element(document.getElementById('categoryTable')).append(compiledHtml);
        }
    });


/**
 * Created by gsadaram on 6/8/2015.
 */
