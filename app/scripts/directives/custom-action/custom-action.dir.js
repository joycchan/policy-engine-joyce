'use strict';

angular.module('policyEngine')
    .directive('customAction', function () {
        return {
            templateUrl: 'scripts/directives/custom-action/custom-action.html',
            controller: function ($scope){

                  $scope.ok = function () {
                        $modalInstance.close($scope.selected);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };


            },

            scope: {
                ruleSet: '=',
                editRule: '='
            },
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                    }
        };
    });
