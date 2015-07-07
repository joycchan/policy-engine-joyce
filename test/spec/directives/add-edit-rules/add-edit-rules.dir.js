'use strict';

describe('Directive: add-edit-rules', function () {
  var element, scope, $compile, $httpBackend;

  var mockRuleSet = {
    "name": "SQL Access",
    "custom": false,
    "services": "None",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pellentesque massa ac urna dictum, non pretium nulla fermentum.",
    "id": "1",
    "_key": "lt-1",
    "rules": [{
        "actionIds": ["1"],
        "classifierIds": ["1"],
        "$$hashKey": "object:33"
    }, {
        "actionIds": ["5", "6"],
        "classifierIds": ["1", "2"],
        "$$hashKey": "object:34"
    }]
  };

  var mockEmptyRuleSet = {
    rules: []
  };

  beforeEach(module('policyEngine'));

  beforeEach(inject(function ($rootScope, _$compile_, _$httpBackend_) {
    $compile = _$compile_;
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET("api/services").respond(200);
    $httpBackend.expectGET("api/groups").respond(200);
    $httpBackend.expectGET("api/assignments").respond(200);
    $httpBackend.expectGET("api/rule_sets").respond(200);
    $httpBackend.expectGET("api/actions").respond(200);
    $httpBackend.expectGET("api/importable_use_groups").respond(200);
    $httpBackend.expectGET("api/endpoint_pools").respond(200);
    $httpBackend.expectGET("api/classifiers").respond(200);
    $httpBackend.expectGET("api/categories").respond(200);

    scope.ruleSet = mockRuleSet;
    element = '<add-edit-rules rule-set="ruleSet"></add-edit-rules>'
    element = $compile(element)(scope);
  }));

  it('should display "Edit" when rules exist', function() {
    scope.ruleSet = mockRuleSet;
    scope.$digest();
    var text = element.find('.addEditRules').text().trim();

    expect(text.slice(0,4)).toBe("Edit");
  });

  it('should display add when there are no rules', function() {
    scope.ruleSet = mockEmptyRuleSet;
    scope.$digest();
    var text = element.find('.addEditRules').text().trim();

    expect(text.slice(0,3)).toBe("Add");
  });
 
});
