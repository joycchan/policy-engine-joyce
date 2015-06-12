'use strict';

angular.module('policyEngine').factory('PolicyStore', function(Table, Util) {

  var tables = {
    Services: new Table(),
    Groups: new Table(),
    Assignments: new Table(),
  };

  window.tables = tables;

  return tables;

});
