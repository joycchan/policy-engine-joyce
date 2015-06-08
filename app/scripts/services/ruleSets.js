'use strict';

angular.module('policyEngine').factory('ruleSets',
  function ($http) {
    var service = {};

    var list = [];

    service.list = function () {
      return list;
    };

    service.create = function (ruleSet) {
      list.push(ruleSet);
      return ruleSet;
    };

    $http.get('api/ruleSets').success(function (data) {
      list = data;
    });

    service.byCustom = function (custom) {
      return _.filter(list, function (ruleSet) {
        if(custom === "")
        {
          return ruleSet;
        }
        else {
          return ruleSet.custom === custom;
        }
      });
    };

    return service;
  });
