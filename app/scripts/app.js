"use strict";

angular.module("policyEngine", [

  "ui.router", 'ngDraggable','uiSwitch','ui.bootstrap','ui.checkbox'

])
  .config(
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/launch/");

    $stateProvider
      .state("launch", {
        url: "/launch/",
        templateUrl: "scripts/launch/launch.html",
        controller: "LaunchCtrl"
      })
      .state("main", {
        abstract: true,
        url: "/",
        templateUrl: "scripts/main/main.html",
        controller: "MainCtrl"
      })
      .state("main.account", {
        url: "account/",
        templateUrl: "scripts/main/account/account.html",
        controller: "AccountCtrl"
      })
        .state("main.services", {
          url: "services/",
          templateUrl: "scripts/main/services/services.html",
          controller: "ServicesCtrl"
        })

        .state("main.configuration", {
          url: "configuration/",
          templateUrl: "scripts/main/configuration/setup.html",
          controller: "ConfigurationCtrl"
        })

        .state("main.groups", {
          url: "groups/",
          templateUrl: "scripts/main/groups/groups.html",
          controller: "GroupsCtrl"
        })
        .state("main.groupsEdit", {
          abstract: true,
          url: "groups/edit/",
          controller: "GroupsEditCtrl",
          templateUrl: "scripts/main/groups/edit/edit.html"
        })
        .state("main.groupsEdit.settings", {
          url: "settings/",
          templateUrl: "scripts/main/groups/edit/settings/settings.html"
        })
        .state("main.groupsEdit.servicesProvided", {
          url: "services/provided/",
          templateUrl: "scripts/main/groups/edit/servicesProvided/servicesProvided.html"
        })
        .state("main.groupsEdit.services", {
          url: "services/consumed/",
          templateUrl: "scripts/main/groups/edit/servicesConsumed/servicesConsumed.html"
        })
        .state("main.service", {
          url: "service/",
          templateUrl: "scripts/main/service/service.html",
          controller: "ServiceCtrl"
        })
          .state("main.service.newGroup", {
            url: 'newGroup/',
            views: {
              group: {
                templateUrl: 'scripts/main/modals/groups/new.html',
                controller: 'NewGroupCtrl',
              }
            }
          })
          .state("main.service.existingGroup", {
            url: 'existingGroup/',
            views: {
              group: {
                templateUrl: 'scripts/main/modals/groups/existing.html',
                controller: 'ExistingGroupCtrl'
              }
            }
          })
          .state("main.service.newRuleSet", {
            url: 'newRuleSet/',
            views: {
              ruleSet: {
                templateUrl: 'scripts/main/modals/rule-sets/new.html',
                controller: 'NewRuleSetCtrl'
              }
            }
          })
          .state("main.service.existingRuleSet", {
            url: 'existingRuleSet/',
            views: {
              ruleSet: {
                templateUrl: 'scripts/main/modals/rule-sets/existing.html',
                controller: 'ExistingRuleSetCtrl',
              }
            }
          })

       .state("main.allocations", {

          url: 'allocations/',
          templateUrl: 'scripts/main/allocations/allocations.html',
          controller: "AllocationsCtrl"
        })
        .state("main.allocation", {
          abstract: true,
          url: "allocations/",
          templateUrl: "scripts/main/allocations/allocation/allocation.html",
          controller: "AllocationCtrl"
        })
          .state("main.allocation.new", {
            url: "new/",
            controller: "AllocationNewCtrl",
            templateUrl: "scripts/main/allocations/new/new.html"
          })

      .state("main.allocation.existing", {
        abstract: true,
        url: ":allocationId/",
        controller: "AllocationExistingCtrl",
        templateUrl: "scripts/main/allocations/allocation/existing.html"
      })
          .state("main.allocation.existing.provide", {
            url: "provide/",
            controller: "ProvideCtrl",
            templateUrl: "scripts/main/allocations/allocation/provide/provide.html"
          })
          .state("main.allocation.existing.consume", {
            url: "consume/",
            controller: "ConsumeCtrl",
            templateUrl: "scripts/main/allocations/allocation/consume/consume.html"
          })
      .state("main.ruleSets", {
        url: "rulesets/",
        controller: "RuleSetsCtrl",
        templateUrl: "scripts/main/rule-sets/rule-sets.html"
      })
      .state("main.ruleSetsEdit", {
        abstract: true,
        url: "rulesets/edit/{ruleId}/",
        controller: "RuleSetsEditCtrl",
        templateUrl: "scripts/main/rule-sets/edit/edit.html"
      })
      .state("main.ruleSetsEdit.settings", {
        url: "settings/",
        templateUrl: "scripts/main/rule-sets/edit/settings/settings.html"
      })
      .state("main.ruleSetsEdit.services", {
        url: "services/",
        templateUrl: "scripts/main/rule-sets/edit/services/services.html"
      })

  })
  .run(function($rootScope) {
    $rootScope.$on('$stateChangeSuccess',function(){
      //$("html, body").animate({ scrollTop: 0 }, 0);
    })
  });

