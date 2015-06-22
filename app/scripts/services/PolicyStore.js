'use strict';

angular.module('policyEngine').factory('PolicyStore', function(Table, Util) {

  var tables = {
    Services: new Table(),
    Groups: new Table(),
    Assignments: new Table(),
    RuleSets: new Table(),
    Actions: new Table(),
    Classifiers: new Table(),
    Requests: new Table(),
    Errors: new Table(),
    ImportableGroups: new Table()
  };

  window.tables = tables;

  return tables;

});
