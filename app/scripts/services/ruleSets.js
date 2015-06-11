'use strict';

angular.module('policyEngine').factory('ruleSets',
  function ($http) {
    var service = {};

    var list = [];
    var list1 = [];

    service.list = function () {
      return list;
    };

    service.create = function (ruleSet) {
      list.push(ruleSet);
      return ruleSet;
    };

    service.delete = function (ruleSet) {
      _.remove(list, function (s) {
        return s.name === ruleSet.name;
      });
      //reset list object id to trigger watches on Services.list()
      list = angular.copy(list);
    };

    $http.get('api/ruleSets').success(function (data) {
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

    service.edit = function (ruleset) {
      list1 = ruleset;
    };

    service.getEdit = function () {
      return list1;
    };

    return service;
  });
