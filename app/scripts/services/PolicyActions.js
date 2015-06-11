
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

  };

  return actions;

});
