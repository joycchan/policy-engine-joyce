'use strict';

angular.module('policyEngine').factory('configuration',
  function () {
    return {
      account: {
        type: 'odl',
        odl: {
          ip: "localhost",
          port: '8181'
        },
        apic: {
          ip: "10.194.126.196",
          port: '8080'
        }
      }
    }
  });
