'use strict';

angular.module('policyEngine')
  .directive('customClassifier', function () {
    return {
      templateUrl: 'scripts/directives/custom-classifier/custom-classifier.html',
      controller: function ($scope) {

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
        ];

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
        ];

        $scope.category = [
          {name: 'Uncategorized', value: 'Un'},
        ];

      },
      scope: {
        classifier: '='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
