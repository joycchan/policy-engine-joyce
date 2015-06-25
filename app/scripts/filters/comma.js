'use strict';

angular.module('policyEngine').filter('comma', [
  function() {
    return function(array) {
      return array.join(', ');
    };
  }
]);
