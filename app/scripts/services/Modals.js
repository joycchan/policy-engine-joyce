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
      'editGroup': function(editGroup) {
        return {
          'animation': false,
          templateUrl: 'scripts/main/modals/groups/editGroup.html',
          windowTemplateUrl: 'scripts/templates/modal/window.html',
          controller: 'NewGroupCtrl',
          size: 'lg',
          resolve: {
            saveEditGroup: function () {
              return editGroup;
            }
          }
        }
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
      'editRule': function(editRule) {
        return {
          'animation': false,
          templateUrl: 'scripts/main/modals/rule-sets/editRule.html',
          windowTemplateUrl: 'scripts/templates/modal/window.html',
          controller: 'NewRuleSetCtrl',
          size: 'lg',
          resolve: {
            saveEditRule: function () {
              return editRule;
            }
          }
        }
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
      }
    };

    return service;
  });

