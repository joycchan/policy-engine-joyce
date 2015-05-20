'use strict';

angular.module('policyEngine').controller('MainCtrl',
    function($scope, $http) {
        $scope.services = [];

        $scope.groups = [];

        $http.get('api/groups').success(function(data) {
            $scope.groups = data;
        });
    }
);