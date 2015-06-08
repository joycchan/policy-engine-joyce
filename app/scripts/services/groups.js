'use strict';

angular.module('policyEngine').factory('groups',
  function ($http) {
    var service = {};

    var list = [];

    service.list = function() {
      return list;
    };

    service.create = function (group) {
      list.push(group);
      return group;
    };

    $http.get('api/groups').success(function (data) {
      list = data;
    });

    service.byType = function (type) {
      return _.filter(list, function (group) {
        if(type === "")
        {
          return group;
        }
        else {
          return group.type === type;
        }
      });
    };

    return service;
  });

