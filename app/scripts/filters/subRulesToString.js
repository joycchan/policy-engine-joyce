'use strict';

angular.module('policyEngine').filter('subRulesToString',
  function(StoreHelpers) {
    return function(rules, key) {
      return rules.map(function(rule) {
        return _.pluck(StoreHelpers.getChildArray(rule, key), 'name');
      }).join(', ');
    };
  }
);
