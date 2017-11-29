'use strict';

const chai = require('chai')
chai.use(require('chai-string'));
const expect = chai.expect;

const td = require('testdouble');
const ANY = td.matchers.anything();

var testLibBMock;
var testlibA;

before(() => {
  Object.keys(require.cache).forEach((key) => delete require.cache[key]);
  
  testLibBMock = td.object(["read"]);
  td.replace('../lib/testlibB', testLibBMock);
  testlibA = require('../lib/testlibA.js');
});

afterEach(() => {
    td.reset();
});


describe('The first module', () => {
  it('should do something', () => {
    td.when(testLibBMock.read(ANY)).thenReturn(Promise.resolve({"hello": "bug"}));
    
    return testlibA.callB("test")
      .then(res => expect(res.hello).to.eq("bug"));
  });
});