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
      var matchingRuleSetInList = _.find(list, function(ruleSet) {
        return ruleSet.id === updatedRuleSet.id;
      });
      _.merge(matchingRuleSetInList, updatedRuleSet);
      // TODO: update this so that it does a PUT request instead of handling that here
    };

    $http.get('api/ruleSets').success(function (data) {
      list = data;
      console.log("list", list);
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

    service.generateEmptyRuleSet = function() {
      return {
        name: "New Rule Set",
        rules: [{
          classifiers: [],
          actions: [],
        }],
        custom: "Custom",
        id: (Math.floor(Math.random() * 10000)).toString()
        // while the user is in main.ruleSetsEdit, the id allows the user to select a rule set out of the list to modify
        // logic in that state depends on $stateParams because it is not a modal w/ one parent controller
        // whereas in main.service, the data is on one controller which is the state of truth for the modals' data
        // TODO: remove client-side id generation
      };
    };

    service.classifiersFilter = function(rules) {
      return _.map(rules, function(rule) {
        return _.pluck(rule.classifiers, 'name');
      }).join(', ');
    };

    return service;
  });
