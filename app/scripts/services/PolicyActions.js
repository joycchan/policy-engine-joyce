'use strict';

angular.module('policyEngine').factory('PolicyActions', function(PolicyStore, Util, $http, configuration, $timeout) {

  var path = function(resource, id) {
    var suffix = id ? '/' + id : '';
    return configuration.backEndUrl + resource + suffix;
  };

  var CreateRequest = function(action, objectId) {
    var request = {
      id: Util.uid(),
      action: action,
      complete: false,
      object: objectId,
      error: null,
    };
    PolicyStore.Requests.insert(request);
    return request;
  };

  var CompleteRequest = function(request) {
    PolicyStore.Requests.update({id: request.id}, {complete: true});
  };

  var actions = {
    
    FetchServices: function() {

      var request = CreateRequest("FetchServices");
      $http.get(path('services')).success(function (data) {
        data.map(actions.ReceiveService);
        CompleteRequest(request);
      }).error(function(data, status) {
        CompleteRequest(request);
        PolicyStore.Errors.insert({
          id: Util.uid(),
          message: "Failed to load services.",
          status: status,
          dismissed: false,
        });
      });


    },

    ReceiveService: function(service) {
      PolicyStore.Services.insert(service);  
    },

    CreateService: function(service) {
      service.id = Util.uid(); // generate ids locally for now
      PolicyStore.Services.insert(service);
      $http.post(path('services'), service);
      return service;
    },

    UpdateService: function(service) {
      PolicyStore.Services.update({id: service.id}, service);
      $http.patch(path('services', service.id), service);
    },

    DeleteService: function(id) {
      PolicyStore.Services.delete({id: id});
      $http.delete(path('services', id));
    },



    FetchGroups: function() {
      $http.get(path('groups')).success(function (data) {
        data.map(actions.ReceiveGroup);
      });
    },

    ReceiveGroup: function(group) {
      PolicyStore.Groups.insert(group);  
    },

    CreateGroup: function(group) {
      var id = Util.uid(); // generate ids locally for now
      group.id =id;

      var request = CreateRequest("CreateGroup", id);

      PolicyStore.Groups.insert(group);
      $http.post(path('groups'), group).success(function(data) {
        CompleteRequest(request);
      }).error(function(data, status) {
        CompleteRequest(request);
        PolicyStore.Errors.insert({
          id: Util.uid(),
          message: "Failed to create " + group.name,
          status: status,
          dismissed: false,
        });
      });

      return request;
    },

    UpdateGroup: function(group) {
      PolicyStore.Groups.update({id: group.id}, group);
      $http.patch(path('groups', group.id), group);
    },

    DeleteGroup: function(id) {
      PolicyStore.Groups.delete({id: id});
      $http.delete(path('groups', id));
    },



    FetchAssignments: function() {
      $http.get(path('nonempty_assignments')).success(function (data) {
        data.map(actions.ReceiveAssignment);
      });
    },

    ReceiveAssignment: function(assignment) {
      PolicyStore.Assignments.insert(assignment);  
    },

    CreateAssignment: function(assignment) {
      assignment.id = Util.uid(); // generate ids locally for now
      PolicyStore.Assignments.insert(assignment);
      $http.post(path('assignments'), assignment);
      return assignment;
    },

    UpdateAssignment: function(assignment) {
      PolicyStore.Assignments.update({id: assignment.id}, assignment);
      $http.patch(path('assignments', assignment.id), assignment);
    },

    DeleteAssignment: function(id) {
      PolicyStore.Assignments.delete({id: id});

      $http.delete(path('assignments', id));
    },

    FetchRuleSets: function() {
      $http.get(path('rule_sets')).success(function (data) {
        data.map(actions.ReceiveRuleSet);
      });
    },

    ReceiveRuleSet: function(ruleSet) {
      PolicyStore.RuleSets.insert(ruleSet);
    },

    CreateRuleSet: function(ruleSet) {
      ruleSet.id = Util.uid(); // generate ids locally for now
      PolicyStore.RuleSets.insert(ruleSet);
      $http.post(path('rule_sets'), ruleSet);
      return ruleSet;
    },

    UpdateRuleSet: function(ruleSet) {
      PolicyStore.RuleSets.update({id: ruleSet.id}, ruleSet);
      $http.patch(path('rule_sets', ruleSet.id), ruleSet);
    },

    DeleteRuleSet: function(id) {
      PolicyStore.RuleSets.delete({id: id});
      $http.delete(path('rule_sets', id));
    },

    FetchActions: function() {
      $http.get(path('actions')).success(function (data) {
        data.map(actions.ReceiveAction);
      });
    },

    ReceiveAction: function(action) {
      PolicyStore.Actions.insert(action);
    },

    CreateAction: function(action) {
      action.id = Util.uid(); // generate ids locally for now
      PolicyStore.Actions.insert(action);
      $http.post(path('actions'), action);
      return action;
    },

    UpdateAction: function(action) {
      PolicyStore.Actions.update({id: action.id}, action);
      $http.patch(path('actions', action.id), action);
    },

    DeleteAction: function(id) {
      PolicyStore.Actions.delete({id: id});
      $http.delete(path('actions', id));
    },

    FetchClassifiers: function() {
      $http.get(path('classifiers')).success(function (data) {
        data.map(actions.ReceiveClassifier);
      });
    },

    ReceiveClassifier: function(classifier) {
      PolicyStore.Classifiers.insert(classifier);
    },

    CreateClassifier: function(classifier) {
      classifier.id = Util.uid(); // generate ids locally for now
      PolicyStore.Classifiers.insert(classifier);
      $http.post(path('classifiers'), classifier);
      return classifier;
    },

    UpdateClassifier: function(classifier) {
      PolicyStore.Classifiers.update({id: classifier.id}, classifier);
      $http.patch(path('classifiers', classifier.id), classifier);
    },

    DeleteClassifier: function(id) {
      PolicyStore.Classifiers.delete({id: id});
      $http.delete(path('classifiers', id));
    },

    FetchCategories: function() {
      $http.get(path('categories')).success(function (data) {
        data.map(actions.ReceiveCategory);
      });
    },

    ReceiveCategory: function(category) {
      PolicyStore.Categories.insert(category);
    },

    UpdateCategory: function(category) {
      PolicyStore.Categories.update({id: category.id}, category);
      $http.patch(path('categories', category.id), category);
    },

    DeleteCategory: function(category) {
      PolicyStore.Categories.delete({id: category.id});
      $http.delete(path('categories', category.id));
    },

    FetchImportableGroups: function() {
      $http.get(path('importable_use_groups')).success(function (data) {
        data.map(actions.ReceiveImportableGroup);
      });
    },

    ReceiveImportableGroup: function(group) {
      PolicyStore.ImportableGroups.insert(group);
    },

    DismissError: function(errorId) {
      PolicyStore.Errors.update({id: errorId}, {dismissed: true});
    }

  };

  return actions;

});
