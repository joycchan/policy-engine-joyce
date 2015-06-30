'use strict';

angular.module('policyEngine').factory('StoreHelpers', function (PolicyStore) {

    var capitalize = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    var getTable = function (field) {
      var tableName = capitalize(field) + "s";
      var table = PolicyStore[tableName];
      if (_.isUndefined(table)) {
        throw "Couldn't find table with name " + tableName;
      }
      return table;
    };

    var storeHelpers = {
      getChild: function (object, field) {
        var table = getTable(field);
        return table.find({id: object[field + "Id"]});
      },
      getChildArray: function (object, field) {
        var table = getTable(field);
        var ids = object[field + "Ids"]
        return ids.map(function (id) {
          return table.find({id: id})
        });
      },
      serviceConsumers: function (service) {
        return _.chain(PolicyStore.Assignments.all())
          .where({serviceId: service.id})
          .pluck('consumerGroupIds')
          .flatten()
          .map(function (groupId) {
            return PolicyStore.Groups.find({id: groupId});
          })
          .value();
      },
      getNestedChildren: function (arr, parent) {
        var out = []
        for (var i in arr) {
          if (arr[i].parentId == parent) {
            var children = storeHelpers.getNestedChildren(arr, arr[i].id)

            if (children.length) {
              arr[i].children = children
            }
            out.push(arr[i])
          }
        }
        return out
      },
      getArrayOfParents: function (array, id) {
        if (typeof array != 'undefined') {
          for (var i = 0; i < array.length; i++) {
            if (array[i].id == id) return [id];
            var a = find(array[i].children, id);
            if (a) {
              a.unshift(array[i].id);
              return a;
            }
          }
        }
        return null;
      }
    };
    return storeHelpers;
  }
);
