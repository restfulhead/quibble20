'use strict';

const testLibA = require('./testlibA');

var lib = {};

lib.doSomething = () => {
  return  testLibA.callB("test");
}

module.exports = lib;