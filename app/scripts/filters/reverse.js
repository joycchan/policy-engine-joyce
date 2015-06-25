'use strict';

angular.module('policyEngine').filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
