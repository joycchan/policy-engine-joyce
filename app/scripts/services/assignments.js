'use strict';

angular.module('policyEngine').factory('assignments',
  function () {
    var service  = {};

    var list = [];

    var assignmentId = list.length;

    service.list = function() {
      return list;
    };

    service.create = function (type, item) {
      assignmentId++;
      var assignment = {
        id: assignmentId.toString(),
        type: type,
        item: item,
        collection: []
      };
      list.push(assignment);
      return assignment;
    };

    service.delete = function(id) {
      _.remove(list, function(all) {
        return all.id === id;
      });
    };

    service.byType = function (type) {
      return _.filter(list, function (assignment) {
        return assignment.type === type;
      });
    };

    service.serviceConsumers = function (service) {
      var groups = [];

      var groupCentrics = _.filter(service.groupCentric(), function (assignment) {
        return _.find(assignment.collection, function (s) {
          return s.name === service.name;
        })
      });

      _.each(groupCentrics, function(assignment) {
        groups.push(assignment.item);
      });

      var serviceCentrics = _.filter(service.serviceCentric(), function(assignment) {
        return assignment.item.name === service.name;
      });

      _.each(serviceCentrics, function(assignment) {
        groups = groups.concat(assignment.collection);
      });

      return groups;
    };

    return service;
  });

