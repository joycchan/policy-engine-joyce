'use strict';

angular.module('policyEngine').factory('groups',
  function ($http) {

    var list = [];

    var groups = {

      list: function () {
        return list;
      },

      create: function (group) {
        list.push(group);
        return group;
      },

      delete: function (group) {
        _.remove(list, function (s) {
          return s.name === group.name;
        });
        //reset list object id to trigger watches on Services.list()
        list = angular.copy(list);
      },

      byType: function (type) {
        return _.filter(list, function (group) {
          if (type === "") {
            return group;
          }
          else {
            return group.type === type;
          }
        });
      }
    };

    $http.get('api/groups').success(function (data) {
      list = data;
    });

    return groups;
  });

