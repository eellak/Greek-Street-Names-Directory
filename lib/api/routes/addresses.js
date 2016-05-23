'use strict';

let utils = require('./utils');

let LIMIT = 25;

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

function setup(imports) {
  let models = imports.models;
  let responses = imports.responses;

  return {
    get: function (req, res) {
      let AddressesModel = models.AddressesModel;

      let query = queryBuilder(req.query);

      let skip = utils.getSkipCursor(req.query.page, LIMIT);

      let findQuery = AddressesModel.find(query);
      findQuery.limit(LIMIT);
      findQuery.skip(skip);

      findQuery.exec(function (err, docs) {
        // called when the `query.complete` or `query.error` are called
        // internally
        responses.sendSuccessResponse(req, res, docs);
      });
    }
  }
}

module.exports = setup;
