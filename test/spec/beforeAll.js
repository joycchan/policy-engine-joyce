// describe("A spec using beforeAll and afterEach", function() {
//   var $httpBackend;

//   beforeAll(module('policyEngine'));

//   beforeAll(inject(function (_$httpBackend_) {
//     $httpBackend = _$httpBackend_;
//   }));

//   it("is just a function, so it can contain any code", function() {
//     $httpBackend.expectGET("api/services").respond(200);
//   });

// });


// describe("A spec using beforeAll and afterAll", function() {
//   var $httpBackend;

//   // beforeAll(function() {
//   //   foo = 1;
//   // });

//   beforeAll(module('policyEngine'));

//   beforeAll(inject(function (_$httpBackend_) {
//       $httpBackend = _$httpBackend_;
//     }));


//   it("sets the initial value of foo before specs run", function() {
//     console.log("hjello world")
//   });

// });