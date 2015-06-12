
'use strict';

angular.module('policyEngine').factory('PolicyActions', function(PolicyStore, Util) {

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

  };

  return actions;

});
