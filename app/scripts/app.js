"use strict";

angular.module("policyEngine", [

  "ui.router", 'ngDraggable','uiSwitch','ui.bootstrap','ui.checkbox'

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
          templateUrl: "scripts/main/configuration/setUp.html",
          controller: "ConfigurationCtrl"
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

          .state("main.service.group", {
            abstract: true,
            url: "group/",
            templateUrl: "scripts/main/service/group/group.html"
          })
            .state("main.service.group.choose", {
              url: "choose/",
              templateUrl: "scripts/main/service/group/choose.html"
            })
            .state("main.service.group.new", {
              url: "new/",
              templateUrl: "scripts/main/service/group/new.html"
            })
            .state("main.service.group.existing", {
              url: "existing/",
              templateUrl: "scripts/main/service/group/existing.html"
            })
          .state("main.service.contract", {
            abstract: true,
            url: "contract/",
            templateUrl: "scripts/main/service/contract/contract.html"
          })
            .state("main.service.contract.choose", {
              url: "choose/",
              templateUrl: "scripts/main/service/contract/choose.html"
            })
            .state("main.service.contract.new", {
              url: "new/",
              templateUrl: "scripts/main/service/contract/new.html"
            })
              .state("main.service.contract.addRule", {
                url: "addRule/",
                templateUrl: "scripts/main/service/contract/addRule.html"
              })
            .state("main.service.contract.existing", {
              url: "existing/",
              templateUrl: "scripts/main/service/contract/existing.html"
            })
          .state("main.service.meta", {
            url: "meta/",
            templateUrl: "scripts/main/service/meta.html"
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
  });

