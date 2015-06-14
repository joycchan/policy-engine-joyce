'use strict';

angular.module('policyEngine').filter('subRulesToString', [
  function() {
    return function(rules, key) {
      console.log('rules', rules);
      return _.map(rules, function(rule) {
        return _.pluck(rule[key], 'name').join(', ');
      }).join(', ');
    };
  }
]);
