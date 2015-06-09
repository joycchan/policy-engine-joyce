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

    // service.generateEmptyRuleSet = function() {
      
    //}

    // service.edit = function(id, data) {
      // find item in list via id property
      // make a put request
      // on success, set the the new list to data returned from server
    }

    return service;
  });
