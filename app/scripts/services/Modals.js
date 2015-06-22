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
      'newRuleSet': {
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
      'ruleSetEditor': function(rulesetsList) {
        return {
          animation: false,
          templateUrl: 'scripts/main/modals/rule-set-editor/rule-set-editor.html',
          controller: 'RuleSetEditorCtrl',
          size: 'lg',
          windowClass: 'ruleEditor-modal',
          windowTemplateUrl: 'scripts/templates/modal/window.html',
          resolve: {
            selectedRuleSet: function() {
              return rulesetsList;
            }
          }
        }
      },
      newAssignment: {
        animation: false,
        templateUrl: 'scripts/main/modals/new-assignment/new-assignment.html',
        controller: 'NewAssignmentCtrl',
        size: 'lg',
        windowClass: 'new-assignment-modal',
        windowTemplateUrl: 'scripts/templates/modal/window.html',
      }
    };

    return service;
  });

