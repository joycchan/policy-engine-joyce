angular.module('policyEngine').controller('customActionsCtrl',
    function ($scope, $modalInstance){


        $scope.ok = function () {
            $modalInstance.close($scope.selected);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });

/**
 * Created by gsadaram on 6/8/2015.
 */
