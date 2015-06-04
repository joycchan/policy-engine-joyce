'use strict';

angular.module('policyEngine').factory('Actions',
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

    $http.get('api/actions').success(function (data) {
      list = data;
    });

    return service;
  });

