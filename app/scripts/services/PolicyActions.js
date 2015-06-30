'use strict';

angular.module('policyEngine').factory('PolicyActions', function (PolicyStore, Util, $http, configuration, $timeout) {

  var KEY = '_key';

  var path = function (resource, id) {
    var suffix = id ? '/' + id : '';
    return configuration.backEndUrl + resource + suffix;
    //return 'http://localhost:8080/' + resource + suffix;
  };

  var CreateRequest = function (action, objectId) {
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

  var CompleteRequest = function (request) {
    PolicyStore.Requests.update({id: request.id}, {complete: true});
  };

  var actions = {

    FetchServices: function () {

      var request = CreateRequest("FetchServices");
      $http.get(path('services')).success(function (data) {
        data.map(actions.ReceiveService);
        CompleteRequest(request);
      }).error(function (data, status) {
        CompleteRequest(request);
        PolicyStore.Errors.insert({
          id: Util.uid(),
          message: "Failed to load services.",
          status: status,
          dismissed: false,
        });
      });


    },

    ReceiveService: function (service) {
      PolicyStore.Services.insert(service);
    },

    CreateService: function (service) {
      service.id = Util.uid(); // generate ids locally for now
      PolicyStore.Services.insert(service);
      $http.post(path('services'), service).success(function (data) {
        data.id = data._key;
        PolicyStore.Services.update({id: service.id}, data);
      });
      return service;
    },

    UpdateService: function (service) {
      PolicyStore.Services.update({id: service.id}, service);
      $http.patch(path('services', service[KEY]), service);
    },

    DeleteService: function (service) {
      PolicyStore.Services.delete({id: service.id});
      $http.delete(path('services', service[KEY]));
    },


    FetchGroups: function () {
      $http.get(path('groups')).success(function (data) {
        data.map(actions.ReceiveGroup);
      });
    },

    ReceiveGroup: function (group) {
      PolicyStore.Groups.insert(group);
    },

    CreateGroup: function (group) {
      var id = Util.uid(); // generate ids locally for now
      group.id = id;

      var request = CreateRequest("CreateGroup", id);

      PolicyStore.Groups.insert(group);
      $http.post(path('groups'), group).success(function (data) {
        CompleteRequest(request);
        data.id = data._key;
        PolicyStore.Groups.update({id: group.id}, data);
      }).error(function (data, status) {
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

    UpdateGroup: function (group) {
      PolicyStore.Groups.update({id: group.id}, group);
      $http.patch(path('groups', group[KEY]), group);
    },

    DeleteGroup: function (group) {
      PolicyStore.Groups.delete({id: group.id});
      $http.delete(path('groups', group[KEY]));
    },


    FetchAssignments: function () {
      $http.get(path('assignments')).success(function (data) {
        data.map(actions.ReceiveAssignment);
      });
    },

    ReceiveAssignment: function (assignment) {
      PolicyStore.Assignments.insert(assignment);
    },

    CreateAssignment: function (assignment) {
      assignment.id = Util.uid(); // generate ids locally for now
      PolicyStore.Assignments.insert(assignment);
      $http.post(path('assignments'), assignment).success(function (data) {
        data.id = data._key;
        PolicyStore.Assignments.update({id: assignment.id}, assignment);
      });
      return assignment;
    },

    UpdateAssignment: function (assignment) {
      PolicyStore.Assignments.update({id: assignment.id}, assignment);
      $http.patch(path('assignments', assignment[KEY]), assignment);
    },

    DeleteAssignment: function (assignment) {
      PolicyStore.Assignments.delete({id: assignment.id});

      $http.delete(path('assignments', assignment[KEY]));
    },

    FetchRuleSets: function () {
      $http.get(path('rule_sets')).success(function (data) {
        data.map(actions.ReceiveRuleSet);
      });
    },

    ReceiveRuleSet: function (ruleSet) {
      PolicyStore.RuleSets.insert(ruleSet);
    },

    CreateRuleSet: function (ruleSet) {
      ruleSet.id = Util.uid(); // generate ids locally for now
      PolicyStore.RuleSets.insert(ruleSet);
      $http.post(path('rule_sets'), ruleSet).success(function (data) {
        data.id = data._key;
        PolicyStore.RuleSets.update({id: ruleSet.id}, data);
      });
      return ruleSet;
    },

    UpdateRuleSet: function (ruleSet) {
      PolicyStore.RuleSets.update({id: ruleSet.id}, ruleSet);
      $http.patch(path('rule_sets', ruleSet[KEY]), ruleSet);
    },

    DeleteRuleSet: function (ruleSet) {
      PolicyStore.RuleSets.delete({id: ruleSet.id});
      $http.delete(path('rule_sets', ruleSet[KEY]));
    },

    FetchActions: function () {
      $http.get(path('actions')).success(function (data) {
        data.map(actions.ReceiveAction);
      });
    },

    ReceiveAction: function (action) {
      PolicyStore.Actions.insert(action);
    },

    CreateAction: function (action) {
      action.id = Util.uid(); // generate ids locally for now
      PolicyStore.Actions.insert(action);
      $http.post(path('actions'), action).success(function (data) {
        data.id = data._key;
        PolicyStore.Actions.update({id: action.id}, data);
      });
      return action;
    },

    UpdateAction: function (action) {
      PolicyStore.Actions.update({id: action.id}, action);
      $http.patch(path('actions', action[KEY]), action);
    },

    DeleteAction: function (action) {
      PolicyStore.Actions.delete({id: action.id});
      $http.delete(path('actions', action[KEY]));
    },

    FetchClassifiers: function () {
      $http.get(path('classifiers')).success(function (data) {
        data.map(actions.ReceiveClassifier);
      });
    },

    ReceiveClassifier: function (classifier) {
      PolicyStore.Classifiers.insert(classifier);
    },

    CreateClassifier: function (classifier) {
      classifier.id = Util.uid(); // generate ids locally for now
      PolicyStore.Classifiers.insert(classifier);
      $http.post(path('classifiers'), classifier).success(function (data) {
        data.id = data._key;
        PolicyStore.Classifiers.update({id: classifier.id}, data);
      });
      return classifier;
    },

    UpdateClassifier: function (classifier) {
      PolicyStore.Classifiers.update({id: classifier.id}, classifier);
      $http.patch(path('classifiers', classifier[KEY]), classifier);
    },

    DeleteClassifier: function (classifier) {
      PolicyStore.Classifiers.delete({id: classifier.id});
      $http.delete(path('classifiers', classifier[KEY]));
    },

    FetchCategories: function () {
      //$http.get(path('categories')).success(function (data) {
      //data.map(actions.ReceiveCategory);
      //});
      var categories = [
        {
          "id": "1",
          "name": "Backup and Storage",
          "image": "photo_backup.png"
        },
        {
          "id": "2",
          "name": "Business and Productivity Tools",
          "image": "photo_business.png"
        },
        {
          "id": "3",
          "name": "Database",
          "image": "photo_database.png"
        },
        {
          "id": "4",
          "name": "Email",
          "image": "photo_email.png"
        },
        {
          "id": "5",
          "name": "Internet Security",
          "image": "photo_internet.png"
        },
        {
          "id": "6",
          "name": "Software Updates",
          "image": "photo_software.png"
        },
        {
          "id": "7",
          "name": "Voice & Video",
          "image": "photo_voice.png"
        }
      ];
      categories.map(actions.ReceiveCategory);
    },

    ReceiveCategory: function (category) {
      PolicyStore.Categories.insert(category);
    },

    UpdateCategory: function (category) {
      PolicyStore.Categories.update({id: category.id}, category);
      $http.patch(path('categories', category[KEY]), category);
    },

    DeleteCategory: function (category) {
      PolicyStore.Categories.delete({id: category.id});
      $http.delete(path('categories', category[KEY]));
    },

    FetchImportableGroups: function () {
      $http.get(path('importable_use_groups')).success(function (data) {
        data.map(actions.ReceiveImportableGroup);
      });
    },

    ReceiveImportableGroup: function (group) {
      PolicyStore.ImportableGroups.insert(group);
    },

    FetchEndpointPools: function () {
      $http.get(path('endpoint_pools')).success(function (data) {
        data.map(actions.ReceiveEndpointPool);
      });
    },

    ReceiveEndpointPool: function (pool) {
      PolicyStore.EndpointPools.insert(pool);
    },

    DismissError: function (errorId) {
      PolicyStore.Errors.update({id: errorId}, {dismissed: true});
    }

  };

  return actions;

});
