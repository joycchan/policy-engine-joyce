'use strict';

angular.module('policyEngine').factory('ruleSets',
  function ($http) {
    var service = {};

    var list = [];

    service.list = function () {
      return list;
    };

    service.create = function (group) {
      list.push(group);
      return group;
    };

    $http.get('api/ruleSets').success(function (data) {
      list = data;
    });

    return service;
  });
