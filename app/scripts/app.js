"use strict";

angular.module("policyEngine", [
  "ui.router", 'ngDraggable','uiSwitch', 'ui.bootstrap'
])
  .config(
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/services/");

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
        .state("main.services", {
          url: "services/",
          templateUrl: "scripts/main/services/services.html",
          controller: "ServicesCtrl"
        })
        .state("main.groups", {
          url: "groups/",
          templateUrl: "scripts/main/groups/groups.html",
          controller: "GroupsCtrl"
        })

        .state("main.service", {
          url: "service/",
          templateUrl: "scripts/main/service/service.html",
          controller: "ServiceCtrl"
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
        abstract: true,
        url: "rulesets/",
        controller: "RuleSetsCtrl",
        templateUrl: "scripts/main/ruleSets/ruleSets.html"
      })
      .state("main.ruleSets.list", {
        url: "list/",
        controller: "RuleSetsListCtrl",
        templateUrl: "scripts/main/ruleSets/list/ruleSetsList.html"
      })
      .state("main.ruleSets.edit", {
        abstract: true,
        url: "edit/",
        controller: "RuleSetsEditCtrl",
        templateUrl: "scripts/main/ruleSets/edit/edit.html"
      })
      .state("main.ruleSets.edit.settings", {
        url: "settings/",
        templateUrl: "scripts/main/ruleSets/edit/settings/settings.html"
      })
      .state("main.ruleSets.edit.services", {
        url: "services/",
        templateUrl: "scripts/main/ruleSets/edit/services/services.html"
      })

  });

