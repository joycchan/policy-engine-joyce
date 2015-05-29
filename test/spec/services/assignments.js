'use strict';

describe('Service: Assignments', function () {

  var assignments;

  beforeEach(module('policyEngine'));

  beforeEach(inject(function (_assignments_) {
    assignments = _assignments_;
  }));

  it('zero assignments', function () {
    expect(assignments.list().length).toEqual(0);
  });

  it('one new assignment', function () {
    assignments.create();
    expect(assignments.list().length).toEqual(1);
    expect(assignments.list()[0].id).toEqual('1');
  });

  it('one new assignment', function () {
    assignments.create();
    assignments.create();
    expect(assignments.list().length).toEqual(2);
    expect(assignments.list()[1].id).toEqual('2');
  });

});

