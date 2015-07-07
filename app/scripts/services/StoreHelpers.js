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
      getNestedChildren: function (readOnlyObjectArray, parentId) {
        var objectArray = angular.copy(readOnlyObjectArray);
        var result = [];
        objectArray.forEach(function (object) {
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
      getParentIds: function (nestedChildren, id) {
        var result;
        if (!_.isUndefined(nestedChildren)) {
          nestedChildren.forEach(function (object, i) {
            if (object.id == id) {
              result = [];
            }
            var a = storeHelpers.getParentIds(object.children, id);
            if (a) {
              a.unshift(object.id);
              result = a;
            }
          })
        }
        return result;
      },
      inheritedConsumerGroups: function(serviceId) {
        var nestedChildren = storeHelpers.getNestedChildren(PolicyStore.Services.all());
        var parentIds = storeHelpers.getParentIds(nestedChildren, serviceId);
        return _.chain(parentIds)
          .map(function(id) { return PolicyStore.Services.find({id: id})})
          .map(function(service) { return storeHelpers.serviceConsumers(service)})
          .flatten()
          .value();
      },
      inheritedServicesConsumed: function(groupId) {
        var nestedChildren = storeHelpers.getNestedChildren(PolicyStore.Groups.all());
        var parentIds = storeHelpers.getParentIds(nestedChildren, groupId);
        return _.chain(parentIds)
          .map(function(id) { return PolicyStore.Groups.find({id: id})})
          .map(function(group) { return storeHelpers.servicesConsumed(group)})
          .flatten()
          .value();
      }

    };
    return storeHelpers;
  }
);
