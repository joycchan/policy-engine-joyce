'use strict';

angular.module('policyEngine').factory('Classifiers',
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

    $http.get('api/classifiers').success(function (data) {
      list = data;
    });

    return service;
  });

