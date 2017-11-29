'use strict';

const chai = require('chai')
chai.use(require('chai-string'));
const expect = chai.expect;

const td = require('testdouble');
const ANY = td.matchers.anything();

var testLibBMock;
var main;

before(() => {
  testLibBMock = td.object(["read"]);
  td.replace('../lib/testlibB', testLibBMock);
  main = require('../lib/testmain');
});

beforeEach(() => {
    td.when(testLibBMock.read(ANY)).thenReturn(Promise.resolve({"hello": "bug"}));
});

afterEach(() => {
    td.reset();
});


describe('The first module', () => {
  it('should do something', () => {
    return main.doSomething()
      .then(res => expect(res.hello).to.eq("bug"));
  });
});