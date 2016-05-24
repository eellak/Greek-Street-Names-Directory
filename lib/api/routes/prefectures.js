'use strict';

let utils = require('./utils');

let LIMIT = 25;

function setup(imports) {
  let models = imports.models;
  let responses = imports.responses;

  return {
    get: function (req, res) {
      let AddressesModel = models.AddressesModel;

      let skip = utils.getSkipCursor(req.query.page, LIMIT);

      let aggregateQuery = AddressesModel.aggregate();
      aggregateQuery.group({ _id: '$prefecture' });
      aggregateQuery.sort({ _id: 1 });
      aggregateQuery.skip(skip);
      aggregateQuery.limit(LIMIT);

      aggregateQuery.exec(function (err, docs) {
        // called when the `query.complete` or `query.error` are called
        // internally
        responses.sendSuccessResponse(req, res, docs);
      });
    },
    getMunicipalities: function (req, res) {
      let AddressesModel = models.AddressesModel;

      let prefecture = req.params.prefecture;
      let skip = utils.getSkipCursor(req.query.page, LIMIT);

      let aggregateQuery = AddressesModel.aggregate();
      aggregateQuery.match({ prefecture: prefecture });
      aggregateQuery.group({ _id: '$municipality' });
      aggregateQuery.sort({ _id: 1 });
      aggregateQuery.skip(skip);
      aggregateQuery.limit(LIMIT);

      aggregateQuery.exec(function (err, docs) {
        // called when the `query.complete` or `query.error` are called
        // internally
        responses.sendSuccessResponse(req, res, docs);
      });
    },
    getAdministrativeRegion: function (req, res) {
      let AddressesModel = models.AddressesModel;

      let prefecture = req.params.prefecture;
      let skip = utils.getSkipCursor(req.query.page, LIMIT);

      let aggregateQuery = AddressesModel.aggregate();
      aggregateQuery.match({ prefecture: prefecture });
      aggregateQuery.group({ _id: '$administrativeRegion', streets: { $push: "$$ROOT" } });
      aggregateQuery.sort({ _id: 1 });
      aggregateQuery.skip(skip);
      aggregateQuery.limit(LIMIT);

      aggregateQuery.exec(function (err, docs) {
        // called when the `query.complete` or `query.error` are called
        // internally
        responses.sendSuccessResponse(req, res, docs);
      });
    }
  }
}

module.exports = setup;
