'use strict';

var responses = require('json-responses')({
  baseDir: __dirname
});

setup.consumes = ['config', 'models'];
setup.provides = ['routes'];

module.exports = setup;

let LIMIT = 25;

function getSkipCursor(page, limit) {
  let skip = 0;

  if (page && page > 1) {
    skip = limit * (page - 1);
  }

  return skip;
}

function queryBuilder(queryString) {
  let query = {};

  if (queryString.street) {
    query.street = queryString.street;
  }

  if (queryString.postCode) {
    query.postCode = queryString.postCode;
  }

  if (queryString.municipality) {
    query.municipality = queryString.municipality
  }

  if (queryString.prefecture) {
    query.prefecture = queryString.prefecture;
  }

  if (queryString.administrativeRegion) {
    query.administrativeRegion = queryString.administrativeRegion;
  }

  return query;
}

function setup(options, imports, register) {
  // @todo: assert config
  const config = imports.config;
  const models = imports.models;

  let routes = {
    addresses: function (req, res) {
      let AddressesModel = models.AddressesModel;

      let query = queryBuilder(req.query);

      let skip = getSkipCursor(req.query.page, LIMIT);

      let findQuery = AddressesModel.find(query);
      findQuery.limit(LIMIT);
      findQuery.skip(skip);

      findQuery.exec(function (err, docs) {
        // called when the `query.complete` or `query.error` are called
        // internally
        responses.sendSuccessResponse(req, res, docs);
      });
    }
  };

  return register(null, {
    routes: routes
  });
};
