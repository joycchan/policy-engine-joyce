
'use strict';

angular.module('policyEngine').factory('PolicyActions', function(PolicyStore, Util, $http, configuration) {

  var assignmentParams = function () {
    return {
      type: configuration.account.type,
      ip: configuration.account[configuration.account.type].ip,
      port: configuration.account[configuration.account.type].port
    }
  };

  var actions = {
    
    FetchServices: function() {
      $http.get('api/services').success(function (data) {
        data.map(actions.ReceiveService);
      });
    },

    ReceiveService: function(service) {
      PolicyStore.Services.insert(service);  
    },

    CreateService: function(service) {
      service.id = Util.uid(); // generate ids locally for now
      PolicyStore.Services.insert(service);
      return service;
    },

    UpdateService: function(service) {
      PolicyStore.Services.update({id: service.id}, service);
    },

    DeleteService: function(id) {
      PolicyStore.Services.delete({id: id});  
    },



    FetchGroups: function() {
      $http.get('api/groups').success(function (data) {
        data.map(actions.ReceiveGroup);
      });
    },

    ReceiveGroup: function(group) {
      PolicyStore.Groups.insert(group);  
    },

    CreateGroup: function(group) {
      group.id = Util.uid(); // generate ids locally for now
      PolicyStore.Groups.insert(group);  
      return group;
    },

    UpdateGroup: function(group) {
          PolicyStore.Groups.update({id: group.id}, group);
    },

    DeleteGroup: function(id) {
      PolicyStore.Groups.delete({id: id});  
    },



    FetchAssignments: function() {
      $http.get('api/assignments').success(function (data) {
        data.map(actions.ReceiveAssignment);
      });
    },

    ReceiveAssignment: function(assignment) {
      PolicyStore.Assignments.insert(assignment);  
    },

    CreateAssignment: function(assignment) {
      assignment.id = Util.uid(); // generate ids locally for now
      PolicyStore.Assignments.insert(assignment);

      $http.post('/assignments', undefined, {params: assignmentParams()}).success(function (response) {
        console.log('success response', response);
      }).error(function (response) {
        console.log('error response', response);
      });

      return assignment;
    },

    UpdateAssignment: function(assignment) {
      PolicyStore.Assignments.update({id: assignment.id}, assignment);
    },

    DeleteAssignment: function(id) {
      PolicyStore.Assignments.delete({id: id});

      $http.delete('/assignments', {params: assignmentParams()}).success(function (response) {
        console.log('success response', response);
      }).error(function (response) {
        console.log('error response', response);
      });
    },

    FetchRuleSets: function() {
      $http.get('api/ruleSets').success(function (data) {
        data.map(actions.ReceiveRuleSet);
      });
    },

    ReceiveRuleSet: function(ruleSet) {
      PolicyStore.RuleSets.insert(ruleSet);
    },

    CreateRuleSet: function(ruleSet) {
      ruleSet.id = Util.uid(); // generate ids locally for now
      PolicyStore.RuleSets.insert(ruleSet);
      return ruleSet;
    },

    UpdateRuleSet: function(ruleSet) {
      PolicyStore.RuleSets.update({id: ruleSet.id}, ruleSet);
    },

    DeleteRuleSet: function(id) {
      PolicyStore.RuleSets.delete({id: id});
    },

    FetchActions: function() {
      $http.get('api/actions').success(function (data) {
        data.map(actions.ReceiveAction);
      });
    },

    ReceiveAction: function(action) {
      PolicyStore.Actions.insert(action);
    },

    CreateAction: function(action) {
      action.id = Util.uid(); // generate ids locally for now
      PolicyStore.Actions.insert(action);
      return action;
    },

    UpdateAction: function(action) {
      PolicyStore.Actions.update({id: action.id}, action);
    },

    DeleteAction: function(id) {
      PolicyStore.Actions.delete({id: id});
    },

    FetchClassifiers: function() {
      $http.get('api/classifiers').success(function (data) {
        data.map(actions.ReceiveClassifier);
      });
    },

    ReceiveClassifier: function(classifier) {
      PolicyStore.Classifiers.insert(classifier);
    },

    CreateClassifier: function(classifier) {
      classifier.id = Util.uid(); // generate ids locally for now
      PolicyStore.Classifiers.insert(classifier);
      return classifier;
    },

    UpdateClassifier: function(classifier) {
      PolicyStore.Classifiers.update({id: classifier.id}, classifier);
    },

    DeleteClassifier: function(id) {
      PolicyStore.Classifiers.delete({id: id});
    },

  };

  return actions;

});
