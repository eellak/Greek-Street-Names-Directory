// Author: Stavros Zavrakas <st.zavrakas@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
require.config({
  paths: {
    'jquery': '/modules/jquery/dist/jquery',
    'underscore': '/modules/underscore/underscore-min',
    'backbone': '/modules/backbone/backbone-min',
    'backbone.paginator': '/modules/backbone.paginator/lib/backbone.paginator',
    'backgrid': '/modules/backgrid/lib/backgrid',
    'backgrid.paginator': '/modules/backgrid-paginator/backgrid-paginator',
    'text': '/modules/text/text',
    'templates': '/public/templates'
  }
});

require([
  // Load our app module and pass it to our definition function
  'app',
], function (App) {
  console.log('main loaded');
  // The "app" dependency is passed in as "App"
  // The other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});
