'use strict';

angular.module('policyEngine').controller('ServicesEdit',
  function ($scope, PolicyStore, $stateParams, $modal, Modals, $state) {
    $scope.service = function() {
      return _.find(PolicyStore.Services.all(), function(service) {
        return service.id === $stateParams.serviceId;
      });
    };

    $scope.navTabLinks = [{
      'name': 'Provider Group',
      'uiSref': 'main.servicesEdit.providerGroup'
    }, {
      'name': 'Rule Set',
      'uiSref': 'main.servicesEdit.ruleSet'
    }, {
      'name': 'Assigned Groups',
      'uiSref': 'main.servicesEdit.assignedGroups'
    }];

    $scope.ruleSet = function() {
      // TODO: currently searching rule sets via 'name', update this to search via id
      return _.first(PolicyStore.RuleSets.where({'name': $scope.service().ruleSet.name}));
    }

    $scope.editRule = function () {
      var modalInstance = $modal.open(Modals.ruleSetEditor(angular.copy($scope.ruleSet())));

      modalInstance.result.then(function (updatedRuleSet) {
        PolicyStore.RuleSets.update({id: updatedRuleSet.id}, updatedRuleSet)
      }, function () {
      });
    };

    // TODO: currently searching via 'name' property, update this to search via id
    var _groups = PolicyStore.Assignments.where({'item': {name: $scope.service().name}})[0];

    $scope.groups = function() {
      return byCustom('');
    };

    $scope.groupFilters = [
      {name: 'All Groups'},
      {name: 'User Group', inactiveIconSrc: 'images/icon_users_16.png', activeIconSrc: 'images/icon_users_16_blue.png'},
      {name: 'Resource Group', inactiveIconSrc: 'images/icon_resources_16.png', activeIconSrc: 'images/icon_resources_16_blue.png'}
    ];

    $scope.filter = "All Groups";

    var byCustom = function (type) {
      return _.filter(_groups.collection, function (groups) {
        if (type === "") {
          return groups;
        }
        else {
          return groups.type === type;
        }
      });
    };

    $scope.filterGroupsList = function (name) {
      $scope.filter = name;

      if (name === 'User Group') {
        $scope.groups = function () {
          return byCustom('user')
        };
      }
      else if (name === 'Resource Group') {
        $scope.groups = function () {
          return byCustom('resource')
        };
      }
      else {
        $scope.groups = function () {
          return byCustom('')
        };
      }
    };

    $scope.isGroupsListFilterSelected = function (name) {
      return name === $scope.filter;
    };

    $scope.goToAssignment = function () {
      $state.go('main.assignment.serviceCentric', {assignmentId: _groups.id});
    };

    

  });
