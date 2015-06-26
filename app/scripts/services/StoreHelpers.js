'use strict';

angular.module('policyEngine').factory('StoreHelpers', function(PolicyStore) {

  var capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  var getTable = function(field) {
      var tableName = capitalize(field) + "s"; 
      var table = PolicyStore[tableName];
      if (_.isUndefined(table)) {
        throw "Couldn't find table with name " + tableName;
      }
      return table;
  };

  return {
    getChild: function(object, field) {
      var table = getTable(field);
      return table.find({id: object[field + "Id"]});
    },
    getChildArray: function(object, field) {
      var table = getTable(field);
      var ids = object[field + "Ids"]
      return ids.map(function(id) {
        return table.find({id: id})
      });
    }
  }
});
