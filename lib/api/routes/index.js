'use strict';

let responses = require('json-responses')({
  baseDir: __dirname
});

let addresses = require('./addresses');
let prefectures = require('./prefectures');
let municipalities = require('./municipalities');

setup.consumes = ['models'];
setup.provides = ['routes'];

module.exports = setup;

function setup(options, imports, register) {
  // @todo: assert imports
  const models = imports.models;
  imports.responses = responses;

  let routes = {
    addresses: addresses(imports),
    prefectures: prefectures(imports),
    municipalities: municipalities(imports)
  };

  return register(null, {
    routes: routes
  });
};
