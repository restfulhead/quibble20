'use strict';

const chai = require('chai')
chai.use(require('chai-string'));
const expect = chai.expect;

const td = require('testdouble');
const ANY = td.matchers.anything();

var testLibAMock;
var main;

before(() => {
  testLibAMock = td.object(["callB"]);
  td.replace('../lib/testlibA', testLibAMock);
  main = require('../lib/testmain');
});

beforeEach(() => {
    td.when(testLibAMock.callB(ANY)).thenReturn(Promise.resolve({"hello": "world"}));
});

afterEach(() => {
    td.reset();
});


describe('The first module', () => {
  it('should do something', () => {
    return main.doSomething()
      .then(res => expect(res.hello).to.eq("world"));
  });
});