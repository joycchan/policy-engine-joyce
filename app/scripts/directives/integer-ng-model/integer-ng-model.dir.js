'use strict';

angular.module('policyEngine')
  .directive('integerNgModel', function() {
    return {
      require: 'ngModel',
      link: function(scope, ele, attr, ctrl){
        // used to watch the ng-model on an input element with type=text
         // and convert the string into a number
        ctrl.$parsers.unshift(function(viewValue){
          return parseInt(viewValue, 10);
        });
      }
    };
  });