'use strict';

const testLibB = require('./testlibB');

module.exports.callB = (msg) => {
  return testLibB.read(msg);
}