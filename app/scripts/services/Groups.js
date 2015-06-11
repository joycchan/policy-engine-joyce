'use strict';

angular.module('policyEngine').factory('Groups',
  function ($http) {

    var list = [];
    var list1= [];

    var Groups = {

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
      },

      edit: function (group) {
        list1 = group;
      },

      getEdit: function () {
        return list1;
      }
    };

    $http.get('api/groups').success(function (data) {
      list = data;
    });

    return Groups;
  });

