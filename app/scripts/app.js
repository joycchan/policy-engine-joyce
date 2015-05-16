"use strict";

angular.module("policyEngine", [
  "ui.router"
])
  .config(
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/services/");

    $stateProvider
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
        .state("main.service", {
          abstract: true,
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
            .state("main.service.contract.existing", {
              url: "existing/",
              templateUrl: "scripts/main/service/contract/existing.html"
            })
          .state("main.service.meta", {
            url: "meta/",
            templateUrl: "scripts/main/service/meta.html"
          })
        .state("main.allocations", {
          url: "allocations/",
          templateUrl: "scripts/main/allocations/allocations.html",
          controller: "AllocationsCtrl"
        })
          .state("main.allocations.provide", {
            url: "allocations/provide",
            templateUrl: "scripts/main/allocations/provide.html"
          })
          .state("main.allocations.consume", {
            url: "allocations/consume",
            templateUrl: "scripts/main/allocations/consume.html"
          })
  });

