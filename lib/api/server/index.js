'use strict';

let http = require('http');
let path = require('path');
let assert = require('assert');
let express = require('express');
let bodyParser = require('body-parser');
let errorHandler = require('errorhandler');

module.exports = setup;

setup.consumes = ['config', 'routes'];
setup.provides = [];

function setup(options, imports) {
  // @todo: assert imports
  let config = imports.config;
  let routes = imports.routes;

  let app = express();
  let router = express.Router();

  app.set('port', config.PORT);
  app.use(bodyParser.json());

  router.get('/address', routes.addresses.get);
  
  router.get('/prefectures', routes.prefectures.get);
  router.get('/municipalities', routes.municipalities.get);
  router.get('/prefectures/:prefecture/municipalities', routes.prefectures.getMunicipalities);
  router.get('/prefectures/:prefecture/administrativeRegions', routes.prefectures.getAdministrativeRegion);

  // hello world test
  router.get('/', function (req, res) {
    res.send('Hello World!');
  });

  app.use('/api', router);

  if (app.get('env') === 'development') {
    app.use(errorHandler());
  }

  let server = http.createServer(app);

  server.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
  });
};
