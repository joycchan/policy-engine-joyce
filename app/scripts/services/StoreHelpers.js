'use strict';

angular.module('policyEngine').factory('StoreHelpers', function(PolicyStore) {

  return {
    getChild: function(object, field) {

      var capitalize = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      var tableName = capitalize(field) + "s"; 
      var table = PolicyStore[tableName];
      if (_.isUndefined(table)) {
        throw "Couldn't find table with name " + tableName;
      }

      return table.find({id: object[field]});

    }
  }

});
