'use strict';

angular.module('policyEngine').factory('Services',
  function ($http) {

    var list = [];

    var Services = {
      list: function () {
        return list;
      },

      create: function (service) {
        list.unshift(service);
        return service;
      },

      delete: function (service) {
        _.remove(list, function (s) {
          return s.name === service.name;
        });
        //reset list object id to trigger watches on Services.list()
        list = angular.copy(list);
      },

      byCategory: function (category) {
        return _.filter(list, function (service) {
          return service.category.name == category.name;
        });
      },

      uniqueProviderGroups: function() {
        return _.uniq(_.map(Services.list(), function (service) {
          return service.group
        }), 'name');
      },

      uniqueRuleSets: function() {
        return _.uniq(_.map(Services.list(), function (service) {
          return service.ruleSet
        }), 'name');
      }
    };


    $http.get('api/services').success(function (data) {
      list = data;
    });

    return Services;
  });
