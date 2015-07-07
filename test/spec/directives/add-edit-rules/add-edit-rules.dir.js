'use strict';

describe('Directive: add-edit-rules', function () {
  var element, scope, $compile, $httpBackend;

  beforeEach(module('policyEngine'));

  beforeEach(inject(function (_$httpBackend_, _$compile_, $rootScope) {
    // To test a directive, the test runner loads the app, and it performs http
    // GET requests in the .run method in app.js.  This boilerplate is only
    // required because the tests will throw an error if we do not specify that
    // we expected these http requests, even though we do not use the data from these calls.
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET(/api.*/).respond(200); 
    // ---------------------------------------------------------------
    $compile = _$compile_;
    scope = $rootScope.$new();

    scope.ruleSet = GlobalMockData.ruleSet;
    element = '<add-edit-rules rule-set="ruleSet"></add-edit-rules>'
    element = $compile(element)(scope);
  }));

  it('should display "Edit" when rules exist', function() {
    scope.ruleSet = GlobalMockData.ruleSet;
    scope.$digest();
    var text = element.find('.addEditRules').text().trim();

    expect(text.slice(0,4)).toBe("Edit");
  });

  it('should display "Add" when no rules exist', function() {
    scope.ruleSet = GlobalMockData.emptyRuleSet;
    scope.$digest();
    var text = element.find('.addEditRules').text().trim();

    expect(text.slice(0,3)).toBe("Add");
  });
 
});
