'use strict';

angular.module('policyEngine').factory('configuration',
  function () {
    return {
      account: {
        serverIP: "localhost",
        serverPort: '8181'
      }
    }
  });
