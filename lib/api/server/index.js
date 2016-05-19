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

let mongoose = require('mongoose');
var uri = 'mongodb://localhost/greek-addresses-small-test';
let connection = mongoose.createConnection(uri, { server: { poolSize: 10 } });

let Schema = mongoose.Schema;
let addressSchema = new Schema({
  addressId: { type: Number, required: true },
  street: { type: String, required: true },
  postCode: { type: Number, required: true },
  municipality: { type: String, required: true },
  prefecture: { type: String, required: true },
  administrativeRegion: { type: String }
});

mongoose.model('addresses', addressSchema);

const LIMIT = 25;
const OFFSET = 0;

module.exports = function (options, imports) {
  let app = express();
  let router = express.Router();

  app.set('port', process.env.PORT || 3000);
  app.use(bodyParser.json());

  router.get('/address', function (req, res) {
    let Address = connection.model('addresses');
    let page = req.query.page;

    var query = Address.find({});
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
