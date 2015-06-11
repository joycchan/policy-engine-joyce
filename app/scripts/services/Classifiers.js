'use strict';

angular.module('policyEngine').factory('Classifiers',
  function ($http) {
    var service = {};

    var list = [];

    service.list = function () {
      return list;
    };

    service.delete = function (classifier) {
      _.remove(list, function (s) {
        return s.name === classifier.name;
      });
      //reset list object id to trigger watches on Services.list()
      list = angular.copy(list);
    };

    service.create = function (group) {
      list.push(group);
      return group;
    };

    $http.get('api/classifiers').success(function (data) {
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

