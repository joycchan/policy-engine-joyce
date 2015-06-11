'use strict';

angular.module('policyEngine').factory('PolicyStore', function(Table, Util) {

  var tables = {
    Services: new Table(),
  };

  return tables;

});
