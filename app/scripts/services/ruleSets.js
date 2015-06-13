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

    service.update = function(updatedRuleSet) {
      var matchingRuleSetIndex = _.findIndex(list, function(ruleSet) {
        return ruleSet.id === updatedRuleSet.id;
      });
      list[matchingRuleSetIndex] = updatedRuleSet;

      // TODO: update this so that it does a PUT request instead of handling that here
    }

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

    return service;
  });
