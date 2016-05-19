'use strict';

let http = require('http');
let path = require('path');
let assert = require('assert');
let express = require('express');
let bodyParser = require('body-parser');
let errorHandler = require('errorhandler');

var responses = require('json-responses')({
  baseDir: __dirname
});

module.exports = setup;

setup.consumes = ['models'];

const LIMIT = 25;
const OFFSET = 0;

function setup(options, imports) {
  let models = imports.models;

  let app = express();
  let router = express.Router();

  app.set('port', process.env.PORT || 3000);
  app.use(bodyParser.json());

  router.get('/address', function (req, res) {
    let AddressesModel = models.AddressesModel;
    let page = req.query.page;

    var query = AddressesModel.find({});
    query.limit(LIMIT);
    query.skip(OFFSET);

    query.exec(function (err, docs) {
      // called when the `query.complete` or `query.error` are called
      // internally
      responses.sendSuccessResponse(req, res, docs);
    });
  });

  // hello world test
  router.get('/', function (req, res) {
    res.send('Hello World!');
  });

  app.use(router);

  if (app.get('env') === 'development') {
    app.use(errorHandler());
  }

  let server = http.createServer(app);

  server.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
  });
};
