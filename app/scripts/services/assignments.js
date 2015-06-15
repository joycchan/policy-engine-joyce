'use strict';

angular.module('policyEngine').factory('assignments',
  function ($http, configuration) {
    var list = [{"id":"1","type":"groupCentric","item":{"id":"3","name":"Marketing","origin":"ISE (Active Directory)","description":"Lorem ipsum dolor sit amet","servicesProvided":0,"servicesConsumed":4,"type":"user","parentId":"1"},"collection":[{"name":"Loan Management","category":{"name":"Business and Productivity Tools"},"group":{"name":"DB Servers - All Zones"},"ruleSet":{"name":"SQL Access"},"$$hashKey":"object:60"},{"name":"Internet Access","category":{"name":"Internet Security"},"group":{"name":"Internet"},"ruleSet":{"name":"HTTP Access"},"$$hashKey":"object:63"},{"name":"Apps - No Ping","category":{"name":"Database"},"group":{"name":"DB Servers - All Zones"},"ruleSet":{"name":"HTTP Access - No Ping"},"$$hashKey":"object:61"}],"$$hashKey":"object:81"},{"id":"2","type":"serviceCentric","item":{"name":"Apps - Gold","category":{"name":"Database"},"group":{"name":"DB Servers - All Zones"},"ruleSet":{"name":"HTTP Access - Gold Service"}},"collection":[{"id":"4","name":"External Suppliers","origin":"ISE (Active Directory)","description":"Lorem ipsum dolor sit amet","servicesProvided":0,"servicesConsumed":2,"type":"user","parentId":"12","$$hashKey":"object:38"},{"id":"8","name":"App Servers","origin":"VMware vCenter","description":"Lorem ipsum dolor sit amet","servicesProvided":0,"servicesConsumed":2,"type":"resource","$$hashKey":"object:41"},{"id":"1","name":"Employees","origin":"ISE (Active Directory)","description":"Lorem ipsum dolor sit amet","servicesProvided":0,"servicesConsumed":2,"type":"user","$$hashKey":"object:34"}],"$$hashKey":"object:133"},{"id":"3","type":"groupCentric","item":{"id":"5","name":"External Contractors","origin":"ISE (Active Directory)","description":"Lorem ipsum dolor sit amet","servicesProvided":0,"servicesConsumed":3,"type":"user","parentId":"12"},"collection":[{"name":"Internet Access","category":{"name":"Internet Security"},"group":{"name":"Internet"},"ruleSet":{"name":"HTTP Access"},"$$hashKey":"object:63"},{"name":"Apps - No Ping","category":{"name":"Database"},"group":{"name":"DB Servers - All Zones"},"ruleSet":{"name":"HTTP Access - No Ping"},"$$hashKey":"object:61"}],"$$hashKey":"object:176"}];

    var assignmentId = list.length;

    var params = function () {
      return {
        type: configuration.account.type,
        ip: configuration.account[configuration.account.type].ip,
        port: configuration.account[configuration.account.type].port
      }
    };

    var assignments = {


      list: function () {
        return list;
      },
      create: function (type, item) {
        assignmentId++;
        var assignment = {
          id: assignmentId.toString(),
          type: type,
          item: item,
          collection: []
        };

        list.push(assignment);

        $http.post('/assignments', undefined, {params: params()}).success(function (response) {
          console.log('success response', response);
        }).error(function (response) {
          console.log('error response', response);
        });


        window.c = list;
        return assignment;
      },

      read: function(id) {
        return _.find(list, function(assignment) {
          return assignment.id === id;
        });
      },

      update: function(id, assignment) {
        var i = _.findIndex(list, function(assignment) { return assignment.id === id; });
        list[i] = assignment;
      },

      delete: function (id) {
        _.remove(list, function (all) {
          return all.id === id;
        });
        $http.delete('/assignments', {params: params()}).success(function (response) {
          console.log('success response', response);
        }).error(function (response) {
          console.log('error response', response);
        });

      },

      byType: function (type) {
        return _.filter(list, function (assignment) {
          return assignment.type === type;
        });
      },

      serviceConsumers: function (service) {
        var groups = [];

        var groupCentrics = _.filter(assignments.byType('group'), function (assignment) {
          return _.find(assignment.collection, function (s) {
            return s.name === service.name;
          })
        });


        _.each(groupCentrics, function (assignment) {
          groups.push(assignment.item);
        });

        var serviceCentrics = _.filter(assignments.byType('service'), function (assignment) {
          return assignment.item.name === service.name;
        });

        _.each(serviceCentrics, function (assignment) {
          groups = groups.concat(assignment.collection);
        });

        return groups;
      }
    };

    return assignments;
  })
;

