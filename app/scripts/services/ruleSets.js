'use strict';

angular.module('policyEngine').factory('ruleSets',
  function ($http) {
    var service = {};

    var list = [];
    var selectedList = [];

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
      selectedList = ruleset;
    };

    service.getEdit = function () {
      return selectedList;
    }

    service.generateEmptyRuleSet = function() {
      return {
        name: "New Rule Set",
        rules: [{
          classifiers: [],
          actions: []
        }],
        custom: "Custom",
        id: (Math.floor(Math.random() * 10000)).toString()
        // while the user is in main.ruleSetsEdit, the id allows the user to select a rule set out of the list to modify
        // logic in that state depends on $stateParams because it is not a modal w/ one parent controller
        // whereas in main.service, the data is on one controller which is the state of truth for the modals' data
        // TODO: remove client-side id generation
      };
    };

    service.generateEmptyRule = function() {
      return {
        classifiers: [],
        actions: []
      };

    };

    return service;
  });
