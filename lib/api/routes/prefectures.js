'use strict';

let async = require('async');

let utils = require('./utils');

let LIMIT = 25;

function getAggregateCountQuery(AddressesModel, callback) {
  let calcTotalQuery = AddressesModel.aggregate();
  calcTotalQuery.group({ _id: '$prefecture' });
  calcTotalQuery.group({ _id: 1, count: { $sum: 1 } });
  calcTotalQuery.exec(function (err, docs) {
    let total_entries = 0;
    if (err) {
      // @todo: log the error
    } else {
      total_entries = docs[0].count;
    }

    return callback(null, total_entries);
  });
}

function setup(imports) {
  let models = imports.models;
  let responses = imports.libs.responses;

  return {
    get: function (req, res) {
      let AddressesModel = models.AddressesModel;

      let skip = utils.getSkipCursor(req.query.page, LIMIT);

      async.parallel({
        total: function (callback) {
          getAggregateCountQuery(AddressesModel, callback);
        },
        data: function (callback) {
          let aggregateQuery = AddressesModel.aggregate();
          aggregateQuery.group({ _id: '$prefecture' });
          aggregateQuery.sort({ _id: 1 });
          aggregateQuery.skip(skip);
          aggregateQuery.limit(LIMIT);

          aggregateQuery.exec(callback);
        }
      }, function (err, results) {
        if (err) {
          return responses.sendErrorResponse(req, res, err);
        }

        return responses.sendSuccessResponse(req, res, results.data, { state: { total_entries: results.total } });
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
      aggregateQuery.group({ _id: '$administrativeRegion' });
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
