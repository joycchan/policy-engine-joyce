'use strict';

angular.module('policyEngine').factory('Actions',
  function ($http) {
    var service = {};

    var list = [];

    service.list = function () {
      return list;
    };

    service.create = function (group) {
      list.push(group);
      return group;
    };

    service.delete = function (action) {
      _.remove(list, function (s) {
        return s.name === action.name;
      });
      //reset list object id to trigger watches on Services.list()
      list = angular.copy(list);
    };

    $http.get('api/actions').success(function (data) {
      list = data;
    });

    service.byCustom = function (custom) {
      return _.filter(list, function (ruleSet) {
        if (custom === "") {
          return ruleSet;
        }
        else {
          return ruleSet.custom === custom;
        }
      });
    };

    return service;
  });

