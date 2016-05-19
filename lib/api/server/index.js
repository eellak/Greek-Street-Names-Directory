'use strict';

let http = require('http');
let path = require('path');
let assert = require('assert');
let express = require('express');
let bodyParser = require('body-parser');
let errorHandler = require('errorhandler');

let docsPath = path.resolve(path.join(__dirname, '..', '..', 'docs'));

module.exports = function (options, imports) {
  let app = express();
  let router = express.Router();

  app.set('port', process.env.PORT || 3000);
  app.use(bodyParser.json());

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
