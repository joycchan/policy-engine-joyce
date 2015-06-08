'use strict';

angular.module('policyEngine').factory('assignments',
  function ($http, configuration) {
    var list = [];

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

        return assignment;
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

        var groupCentrics = _.filter(assignments.byType('consume'), function (assignment) {
          return _.find(assignment.collection, function (s) {
            return s.name === service.name;
          })
        });


        _.each(groupCentrics, function (assignment) {
          groups.push(assignment.item);
        });

        var serviceCentrics = _.filter(assignments.byType('provide'), function (assignment) {
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

