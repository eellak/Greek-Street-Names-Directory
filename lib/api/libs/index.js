'use strict';

let responses = require('json-responses');

setup.consumes = [];
setup.provides = ['libs'];

module.exports = setup;

function setup(options, imports, register) {

  responses = responses({
    baseDir: __dirname
  });

  return register(null, {
    libs: {
      responses: responses
    }
  });
};
