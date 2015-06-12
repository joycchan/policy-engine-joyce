
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
    }


  };

  return actions;

});
