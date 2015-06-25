'use strict';

angular.module('policyEngine').factory('ClassifierCategories',
  function () {
    var service = [
      'Business and Productivity',
      'Backup and Storage',
      'Tools',
      'Database',
      'Email',
      'Internet Security'
    ];

    return service;
  });

