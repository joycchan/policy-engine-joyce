"use strict";

angular.module("policyEngine", [
  "store", "ui.router", 'ngDraggable','uiSwitch','ui.bootstrap','ui.checkbox', 'xeditable'
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
          controller: "ServicesCtrl",
          abstract: true
        })
          .state("main.services.filters", {
            url: "?category?group?ruleSet",
            templateUrl: "scripts/main/services/filters.html",
            controller: "ServicesFilterCtrl",
            abstract: true
          })
            .state("main.services.filters.cards", {
              url: "cards/",
              templateUrl: "scripts/main/services/cards/cards.html"
            })
            .state("main.services.filters.list", {
              url: "list/",
              templateUrl: "scripts/main/services/list/list.html"
            })
          .state('main.services.edit', {
            url: "services/edit/{{serviceName}}",
            templateUrl: "/scripts/main/services/edit/edit.html",
            controller: "ServicesEdit"
          })
        .state("main.configuration", {
          url: "configuration/",
          templateUrl: "scripts/main/configuration/setup.html",
          controller: "ConfigurationCtrl"
        })
        .state("main.new", {
          abstract: true,
          url: "new/",
          templateUrl: 'scripts/main/new/new.html',
          controller: 'NewCtrl',
        })
        .state("main.new.group", {
          url: "group/",
          templateUrl: 'scripts/main/modals/groups/new.html',
          controller: 'NewGroupCtrl'
        })
        .state("main.new.ruleSet", {
          url: "rule-set/",
          templateUrl: 'scripts/main/modals/rule-sets/new.html',
          controller: 'NewRuleSetCtrl'
        })
        .state("main.groups", {
          url: "groups/",
          templateUrl: "scripts/main/groups/groups.html",
          controller: "GroupsCtrl"
        })
        .state("main.groupsEdit", {
          abstract: true,
          url: "groups/edit/{groupId}",
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
                controller: 'NewGroupCtrl'
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
                controller: 'ExistingRuleSetCtrl'
              }
            }
          })

        .state("main.assignments", {
          url: 'assignments/',
          templateUrl: 'scripts/main/assignments/assignments.html',
          controller: "AssignmentsCtrl"
        })
        .state("main.assignment", {
          abstract: true,
          url: "assignments/:assignmentId/",
          templateUrl: "scripts/main/assignments/assignment/assignment.html",
          controller: "AssignmentCtrl"
        })
           .state("main.assignment.serviceCentric", {
              url: "service-centric/",
              templateUrl: "scripts/main/assignments/assignment/service-centric/service-centric.html"
            })
            .state("main.assignment.groupCentric", {
              url: "group-centric/",
              templateUrl: "scripts/main/assignments/assignment/group-centric/group-centric.html"
            })
      .state("main.ruleSets", {
        url: "rule-sets/",
        controller: "RuleSetsCtrl",
        templateUrl: "scripts/main/rule-sets/rule-sets.html"
      })
      .state("main.ruleSetsEdit", {
        abstract: true,
        url: "rule-sets/edit/{ruleSetId}/",
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
      .state("main.actions", {
        url: "actions/",
        controller: "Actions",
        templateUrl: "scripts/main/actions/actions.html"
      })
      .state("main.actionsEdit", {
        url: "actions/edit/{actionId}/",
        templateUrl: "scripts/main/actions/edit/edit.html"
      })
      .state("main.classifiers", {
        url: "classifiers/",
        controller: "ClassifiersCtrl",
        templateUrl: "scripts/main/classifiers/classifiers.html"
      })
      .state("main.classifiersEdit", {
        url: "classifiers/edit/{classifierId}/",
        controller: "ClassifiersEditCtrl",
        templateUrl: "scripts/main/classifiers/edit/edit.html"
      })
  })
  .run(function(PolicyActions) {
    PolicyActions.FetchServices();
    PolicyActions.FetchGroups();
    PolicyActions.FetchAssignments();
    PolicyActions.FetchRuleSets();
    PolicyActions.FetchActions();
    PolicyActions.FetchClassifiers();
  });

