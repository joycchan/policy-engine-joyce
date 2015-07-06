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

    var countParents = function(type, item, count) {
      var parent = PolicyStore[type].find({id: item.id}).parentId;
      if (parent) {
        count++;
        return countParents(type, PolicyStore[type].find({id: parent}), count);
      }
      return count;
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
      servicesProvided: function (group) {
        return _.chain(PolicyStore.Services.all())
          .where({providerGroupId: group.id})
          .value();
      },
      servicesConsumed: function (group) {
        return _.chain(PolicyStore.Assignments.all())
          .filter(function (assignment) {
            return _.includes(assignment.consumerGroupIds, group.id);
          })
          .pluck('serviceId')
          .map(function (serviceId) {
            return PolicyStore.Services.find({id: serviceId});
          })
          .value();
      },
      getNestedChildren: function (objectArray, parentId) {
        var result = [];
        objectArray.forEach(function(object) {
          if (object.parentId === parentId) {
            var children = storeHelpers.getNestedChildren(objectArray, object.id);
            if (children.length > 0) {
              object.children = children;
            }
            result.push(object);
          }
        });
        return result;
      },
      numberOfParents: function(type, item) {
        return countParents(type, item, 0);
      }
    };
    return storeHelpers;
  }
);
