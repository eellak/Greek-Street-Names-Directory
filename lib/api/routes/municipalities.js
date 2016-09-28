'use strict';

let utils = require('./utils');

let LIMIT = 25;

function setup(imports) {
  let models = imports.models;
  let responses = imports.libs.responses;

  return {
    get: function (req, res) {
      let AddressesModel = models.AddressesModel;

      let skip = utils.getSkipCursor(req.query.page, LIMIT);

      // @see: http://stackoverflow.com/questions/11782566/mongodb-select-countdistinct-x-on-an-indexed-column-count-unique-results-for
      let calcTotalQuery = AddressesModel.aggregate();
      calcTotalQuery.group({ _id: '$municipality' });
      calcTotalQuery.group({ _id: 1, count: { $sum: 1 } });

      calcTotalQuery.exec(function (err, docs) {
        let total_entries = 0;
        if (err) {
          // @todo: log the error
        } else {
          total_entries = docs[0].count;
        }

        let aggregateQuery = AddressesModel.aggregate();
        aggregateQuery.group({ _id: '$municipality' });
        aggregateQuery.sort({ _id: 1 });
        aggregateQuery.skip(skip);
        aggregateQuery.limit(LIMIT);

        aggregateQuery.exec(function (err, docs) {
          let meta = {
            state: {
              total_entries: total_entries
            }
          };

          responses.sendSuccessResponse(req, res, docs, meta);
        });
      });
    }
  }
}

module.exports = setup;
