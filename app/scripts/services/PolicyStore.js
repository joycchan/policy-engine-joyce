'use strict';

angular.module('policyEngine').factory('PolicyStore', function(Table, Util) {

  var tables = {
    Services: new Table(),
  };

  var actions = {
    
    FetchServices: function() {
      $http.get('api/services').success(function (data) {
        data.map(actions.ReceiveService);
      });
    },

    ReceiveService: function(service) {
      tables.Services.insert(service);  
    },

    CreateService: function(service) {
      service.id = Util.uid(); // generate ids locally for now
      tables.Services.insert(service);  
    },

    DeleteService: function(id) {
      tables.Services.delete({id: id});  
    },

  };

  return {
    Tables: tables,
    Actions: actions,
  };

});
