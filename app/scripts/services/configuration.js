'use strict';

angular.module('policyEngine').factory('configuration',
  function (backEndUrl) {
    return {
      backEndUrl: backEndUrl
    };
  });
