'use strict';

angular.module('policyEngine').factory('Modals',
    function () {
      var service = {
        newGroup: {
          'animation': false,
          templateUrl: 'scripts/main/modals/groups/new.html',
          windowTemplateUrl: 'scripts/templates/modal/window.html',
          controller: 'NewGroupCtrl',
          size: 'lg'
        },
        'existingGroup': {
          animation: false,
          templateUrl: 'scripts/main/modals/groups/existing.html',
          windowTemplateUrl: 'scripts/templates/modal/window.html',
          controller: 'ExistingGroupCtrl',
          size: 'lg'
        },
        'newRuleset': {
          animation: false,
          templateUrl: 'scripts/main/modals/rule-sets/new.html',
          windowTemplateUrl: 'scripts/templates/modal/window.html',
          controller: 'NewRuleSetCtrl',
          size: 'lg'
        },
        'existingRuleset': {
          animation: false,
          templateUrl: 'scripts/main/modals/rule-sets/existing.html',
          windowTemplateUrl: 'scripts/templates/modal/window.html',
          controller: 'ExistingRuleSetCtrl',
          size: 'lg'
        },
        'rulesetEditor': function(rulesetsList) {
          return {
            animation: false,
            templateUrl: 'scripts/main/modals/rule-set-editor/rule-set-editor.html',
            controller: 'RuleSetEditorCtrl',
            size: 'lg',
            windowClass: 'ruleEditor-modal',
            windowTemplateUrl: 'scripts/templates/modal/window.html',
            resolve: {
              selectedRuleset: function() {
                return rulesetsList;
              }
            }
          }
        },
        'customClassifier': function(customClassifiers){
          return {
            animation: false,
            templateUrl: 'scripts/main/modals/rule-set-editor/customClassifier/classifiers.html',
            controller: 'customClassifierCtrl',
            size: 'lg',
            windowClass: 'addCustomerClassifier-modal',
            windowTemplateUrl: 'scripts/templates/modal/window.html',

          }

        },
        'customActions': function(customActions){
          return {
            animation: false,
            templateUrl: 'scripts/main/modals/rule-set-editor/action/action.html',
            controller: 'customActionsCtrl',
            size: 'lg',
            windowClass: 'addCustomerActions-modal',
            windowTemplateUrl: 'scripts/templates/modal/window.html'

          }

        }

      };

      return service;
    });

