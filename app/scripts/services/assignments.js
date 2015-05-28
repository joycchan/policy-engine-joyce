'use strict';

angular.module('policyEngine').factory('assignments',
  function ($http) {
    var service  = {};

    //scope.assignments = [{"id":"1","type":"consume","item":{"id":"1","name":"All Employees","description":"ISE (Active Directory)","provided":[],"consumed":[],"$$hashKey":"object:9"},"collection":[{"name":"SQL External Access","group":{"name":"Database Group"},"ruleSet":{"name":"Canned Contract"},"$$hashKey":"object:21"},{"name":"SQL Basic Access","group":{"name":"Database Group"},"ruleSet":{"name":"Canned Contract"},"$$hashKey":"object:19"},{"name":"SQL VIP Access","group":{"name":"Database Group"},"ruleSet":{"name":"Canned Contract"},"$$hashKey":"object:20"}],"$$hashKey":"object:29"}];
    service.list = [];

    var assignmentId = service.list.length;

    service.create = function (type, item) {
      assignmentId++;
      var assignment = {
        id: assignmentId.toString(),
        type: type,
        item: item,
        collection: []
      };
      service.list.push(assignment);
      return assignment;
    };

    service.byType = function (type) {
      return _.filter(service.list, function (assignment) {
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

